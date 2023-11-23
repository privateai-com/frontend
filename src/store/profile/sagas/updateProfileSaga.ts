import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { AccountInfo, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';

import { profileSetStatus, profileUpdateProfile, profileSetAccountInfo } from 'store/profile/actionCreators';

export function* profileUpdateProfileSaga({
  payload,
  type,
}: ReturnType<typeof profileUpdateProfile>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: AccountInfo } = yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.ProfileUpdateProfile,
      payload,
    });

    yield put(profileSetAccountInfo(data));

    if (payload.callback) payload.callback();

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
