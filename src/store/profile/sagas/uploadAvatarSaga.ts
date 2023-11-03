import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { AccountInfo, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';

import { profileSetStatus, profileUploadAvatar, profileSetAccountInfo } from 'store/profile/actionCreators';

export function* profileUploadAvatarSaga({
  payload,
  type,
}: ReturnType<typeof profileUploadAvatar>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const formData = new FormData();
    formData.append('file', payload.file);

    const data: AccountInfo = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.profileUploadAvatar,
      payload: formData,
    });

    yield put(profileSetAccountInfo(data));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
