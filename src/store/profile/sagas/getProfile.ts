import { call, put } from 'redux-saga/effects';
import { ApiEndpoint, callApi, imageRegexp } from 'appConstants';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { accountSetState } from 'store/account/actionCreators';
import { ProfileResponse } from 'types/profileResponse';
import { profileGetProfile, profileSetStatus } from '../actionCreators';

export function* profileGetProfileSaga({
  type,
}: ReturnType<typeof profileGetProfile>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: ProfileResponse } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ProfileGet,
    });

    if (!imageRegexp.test(data.avatarUrl)) data.avatarUrl = '';
    if (!data.fullName) {
      data.fullName = 'Archonaut #000';
    }

    if (data.fullName && !data.username) {
      data.username = 'Archonaut #000';
    }
    yield put(accountSetState(data));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
