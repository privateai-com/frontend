import { call, put } from 'redux-saga/effects';
import { ApiEndpoint, imageRegexp } from 'appConstants';
import { callApi } from 'api';
import { AccountState, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { accountSetState } from 'store/account/actionCreators';
import { profileGetProfile, profileSetStatus } from '../actionCreators';

export function* profileGetProfileSaga({
  type,
}: ReturnType<typeof profileGetProfile>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: AccountState } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ProfileGet,
    });
    
    if (data.avatarUrl) if (!imageRegexp.test(data.avatarUrl)) data.avatarUrl = '';

    if (!data.fullName) {
      data.fullName = `Archonaut #${data.id}`;
    }

    if (data.fullName && !data.username) {
      data.username = `Archonaut #${data.id}`;
    }

    yield put(accountSetState(data));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
