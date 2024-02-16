/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { RefreshAccessTokensData, UpdatePayload } from 'types';

import { SagaIterator } from 'redux-saga';
import {
  call, select, spawn, put, take,
} from 'redux-saga/effects';

import {
  authLogout,
  authSetState,
  authOnUpdateAccessTokensFinish,
} from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';
import { getDataFromException, ApiError } from 'utils';
import { AuthActionTypes } from 'store/auth/actionTypes';
import { store } from 'store/configureStore';

import { ApiEndpoint, apiBaseUrl } from 'appConstants';
import { authInitialState } from 'store/auth';

export * from './getApiQueries';

let isAccessTokensUpdating = false;

function* updateAccessTokens() {
  isAccessTokensUpdating = true;
  let updatePayload: UpdatePayload = { isSuccessfull: false };
  try {
    const url = `${apiBaseUrl}${ApiEndpoint.AuthRefreshToken}`;

    const refreshTokenCurrent: string = yield select(
      authSelectors.getProp('refreshToken'),
    );
    const accessTokenCurrent: string = yield select(
      authSelectors.getProp('accessToken'),
    );

    const payload = {
      refreshToken: refreshTokenCurrent,
    };

    const body = JSON.stringify(payload);

    const requestOptions: Record<string, any> = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessTokenCurrent}`,
      },
      body,
    };

    const response: Response = yield call(fetch, url, requestOptions);

    if (!response.ok) {
      store.dispatch(authSetState(authInitialState));
      // throw new Error(`Request failed with status ${response.status}`);
    }

    const {
      data,
    }: {
      data: RefreshAccessTokensData;
      status: number;
    } = yield call([response, response.json]);

    store.dispatch(authSetState({
      ...data,
    }));

    updatePayload = {
      isSuccessfull: true,
    };
  } catch (error) {
    const { message } = getDataFromException(error);
    yield put(authSetState(authInitialState));

    yield put(authLogout());

    updatePayload = {
      isSuccessfull: false,
      errorMessage: message,
    };
  }

  isAccessTokensUpdating = false;
  yield put(authOnUpdateAccessTokensFinish(updatePayload));
}

export function* waitForFreshAccessToken() {
  const timestamp = new Date().getTime();
  const timestampStored: number | undefined = yield select(
    authSelectors.getProp('timestamp'),
  );
  // Reactotron.log('timestamp', timestamp);
  // Reactotron.log('timestampStored', timestampStored);
  // Reactotron.log(timestampStored !== undefined && timestamp / 1000 > timestampStored);
  if (
    !isAccessTokensUpdating &&
    timestampStored !== undefined &&
    timestamp / 1000 > timestampStored
  ) {
    yield call(updateAccessTokens);
  }
}

export function* callApi(options: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  payload?: Record<string, any> | FormData;
  isBlob?: boolean;
  callbackUploadStatus?: (percent: number) => void;
  cancelTokenSource?: any;
}): SagaIterator {
  const {
    method = 'GET', endpoint, payload, isBlob, callbackUploadStatus, cancelTokenSource,
  } = options;

  yield call(waitForFreshAccessToken);

  const url = `${apiBaseUrl}${endpoint}`;

  let body;

  let requestOptions: Record<string, any>;

  let source;
  if (cancelTokenSource) {
    source = cancelTokenSource;
  } else {
    source = axios.CancelToken.source();
  }

  const isUploadFile = payload instanceof FormData;

  if (isUploadFile) {
    body = payload;
    requestOptions = {
      method,
      headers: {},
      body,
    };
  } else {
    body = JSON.stringify(payload);
    requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };
  }

  const accessToken: string | undefined = yield select(
    authSelectors.getProp('accessToken'),
  );

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (isUploadFile) {
    try {
      const res = yield call(
        axios.request,
        {
          method: requestOptions.method,
          url,
          data: requestOptions.body,
          headers: requestOptions.headers,
          onUploadProgress: (p) => {
            if (callbackUploadStatus) {
              callbackUploadStatus(Math.ceil(100 * (p.loaded / p.total)));
            }
          },
          cancelToken: source.token,
        },
      );
      if (callbackUploadStatus) callbackUploadStatus(100);

      return res;
    } catch (e: any) {
      if (e?.response?.data?.statusCode === 410) {
        throw new ApiError(e?.response?.data?.message, 410, 'error');
      }
      throw new ApiError('Upload file', 500, 'error');
    }
  }

  const response: Response = yield call(fetch, url, requestOptions);

  let json: Record<string, any>;
  if (isBlob) {
    try {
      return yield call([response, response.blob]);
    } catch (error) {
      json = {};
    }
  }
  try {
    const unknowJson: any = yield call([response, response.json]);
    json = unknowJson;
  } catch (error) {
    json = {};
  }

  const { status } = response;

  if (json.message.includes('token uncorrected') || json.message === 'Token not found in headers') {
    yield put(authSetState(authInitialState));
    // window.location.replace('/');
    throw new Error('token uncorrected');
  }
  if (status >= 400) {
    switch (status) {
      case 401: {
        if (json.error === 'Requires second authentication step') {
          throw new ApiError(json.message, status, json.error);
        }

        if (!isAccessTokensUpdating) {
          yield spawn(updateAccessTokens);
        }

        const { isSuccessfull, errorMessage }: UpdatePayload = yield take(
          AuthActionTypes.OnUpdateAccessTokenFinish,
        );
        if (isSuccessfull) {
          return yield call(callApi, options);
        }
        throw new Error(errorMessage);
      }

      default: {
        const message = json.message ?? 'Request error';

        throw new ApiError(message, status, json.error);
      }
    }
  }
  return json;
}
