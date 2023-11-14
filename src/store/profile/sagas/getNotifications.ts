import { call, put } from 'redux-saga/effects';
import { ApiEndpoint } from 'appConstants';
import { NotificationInfo, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import { profileSetStatus, profileSetState, profileNotification } from 'store/profile/actionCreators';
import { callApi } from 'api';

export function* profileGetNotificationsSaga({
  type,
}: ReturnType<typeof profileNotification>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: [NotificationInfo[], number] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.Notification,
    });

    yield put(profileSetState({
      notifications: data[0] || [], 
    }));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
