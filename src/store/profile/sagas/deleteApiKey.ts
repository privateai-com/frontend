import { call, put } from 'redux-saga/effects';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { profileDeleteApiKey, profileSetState, profileSetStatus } from 'store/profile/actionCreators';
import { callApi } from 'api';
import { ApiEndpoint } from 'appConstants';

export function* profileDeleteApiKeySaga({
  type,
}: ReturnType<typeof profileDeleteApiKey>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'DELETE',
      endpoint: ApiEndpoint.ProfileDeleteApiKey,
    });

    yield put(profileSetState({
      apiKey: '', 
    }));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
