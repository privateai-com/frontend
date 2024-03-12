import { call, put } from 'redux-saga/effects';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { profileCreateApiKey, profileSetStatus } from 'store/profile/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';

export function* profileCreateApiKeySaga({
  type,
}: ReturnType<typeof profileCreateApiKey>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ProfileCreateApiKey,
    });

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
