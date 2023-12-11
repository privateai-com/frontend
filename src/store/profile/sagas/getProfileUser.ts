import { call, put } from 'redux-saga/effects';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { AccountInfo, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { 
  profileGetProfileUser, profileSetStateRequester, profileSetStatusRequester,
} from 'store/profile/actionCreators';

export function* profileGetProfileUserSaga({
  payload,
}: ReturnType<typeof profileGetProfileUser>) {
  try {
    yield put(profileSetStatusRequester({ id: payload.id, status: RequestStatus.REQUEST }));

    const endpoint = `${ApiEndpoint.ProfileGetUser}?profileId=${payload.profileId}`;

    const { data }: { data: AccountInfo } = yield call(callApi, {
      method: 'GET',
      endpoint,
    });

    if (data) {
      yield put(profileSetStateRequester(data));
      if (payload.successCallback) payload.successCallback();
    }
    
    yield put(profileSetStatusRequester({ id: payload.id, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatusRequester({ id: payload.id, status: RequestStatus.ERROR }));
  }
}
