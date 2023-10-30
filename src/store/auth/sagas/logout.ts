import { call, put } from 'redux-saga/effects';

import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { accountSetState } from 'store/account/actionCreators';
import { accountInitialState } from 'store/account';

import { RequestStatus } from 'types';
import { authLogout, authSetState, authSetStatus } from '../actionCreators';
import { authInitialState } from '..';

export function* clearReducer() {
  yield put(accountSetState(accountInitialState));
  yield put(authSetState(authInitialState));
}

export function* authLogoutSaga({
  type, payload: {
    callback,
  },
}: ReturnType<typeof authLogout>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthLogout,
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (exception) {
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  } finally {
    if (callback) {
      callback();
    }
    yield call(clearReducer);
  }
}
