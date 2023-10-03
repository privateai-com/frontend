/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefreshAccessTokensData, UpdatePayload } from 'types';

import { SagaIterator } from 'redux-saga';
import {
  call,
  select,
  spawn,
  put,
  take,
} from 'redux-saga/effects';

import { authLogout, authSetState, authOnUpdateAccessTokensFinish } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';
import { getDataFromException, ApiError } from 'utils';
import { AuthActionTypes } from 'store/auth/actionTypes';

import { ApiEndpoint } from './api';

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

let isAccessTokensUpdating = false;

function* updateAccessTokens() {
  isAccessTokensUpdating = true;
  let updatePayload: UpdatePayload = { isSuccessfull: false };
  try {
    const url = `${baseURL}${ApiEndpoint.AuthRefreshToken}`;

    const refreshTokenCurrent: string = yield select(authSelectors.getProp('refreshToken'));
    const accessTokenCurrent: string = yield select(authSelectors.getProp('accessToken'));

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
      throw new Error(`Request failed with status ${response.status}`);
    }

    const {
      data,
    }: {
      data: RefreshAccessTokensData,
      status: number,
    } = yield call([response, response.json]);

    yield put(authSetState({
      ...data,
    }));

    updatePayload = {
      isSuccessfull: true,
    };
  } catch (error) {
    const { message } = getDataFromException(error);

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
  const timestamp = (new Date()).getTime();
  const timestampStored: number | undefined = yield select(authSelectors.getProp('timestamp'));
  // Reactotron.log('timestamp', timestamp);
  // Reactotron.log('timestampStored', timestampStored);
  // Reactotron.log(timestampStored !== undefined && timestamp / 1000 > timestampStored);
  if (
    !isAccessTokensUpdating
    && timestampStored !== undefined
    && timestamp / 1000 > timestampStored) {
    yield call(updateAccessTokens);
  }
}

export function* callApi(options: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  payload?: Record<string, any>;
}): SagaIterator {
  const {
    method = 'GET',
    endpoint,
    payload,
  } = options;

  yield call(waitForFreshAccessToken);

  const url = `${baseURL}${endpoint}`;

  const body = JSON.stringify(payload);

  const requestOptions: Record<string, any> = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  const accessToken: string | undefined = yield select(authSelectors.getProp('accessToken'));

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  const response: Response = yield call(fetch, url, requestOptions);

  let json: Record<string, any>;

  try {
    const unknowJson: any = yield call([response, response.json]);
    json = unknowJson;
  } catch (error) {
    json = {
    };
  }

  const {
    status,
  } = response;

  if (status >= 400) {
    switch (status) {
      case 401: {
        if (json.error === 'Requires second authentication step') {
          throw new ApiError(json.message, status, json.error);
        }

        if (!isAccessTokensUpdating) {
          yield spawn(updateAccessTokens);
        }

        const {
          isSuccessfull,
          errorMessage,
        }: UpdatePayload = yield take(AuthActionTypes.OnUpdateAccessTokenFinish);
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
