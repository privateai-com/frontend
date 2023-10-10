import { call, put } from 'redux-saga/effects';
import { ApiEndpoint, callApi } from 'appConstants';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { accountSetState } from 'store/account/actionCreators';
import { ProfileResponse } from 'types/profileResponse';
import { profileSetState, profileSetStatus } from '../actionCreators';

export function* profileGetProfileSaga({
  type,
}: ReturnType<typeof profileSetState>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: ProfileResponse } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ProfileGet,
    });

    yield put(accountSetState(data));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
