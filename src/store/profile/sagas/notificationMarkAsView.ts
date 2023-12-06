import { call, put } from 'redux-saga/effects';
import { ApiEndpoint } from 'appConstants';
import { RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import {
  profileSetStatus,
  profileNotificationMarkAsView,
  profileNotification,
} from 'store/profile/actionCreators';
import { callApi } from 'api';

export function* profileNotificationMarkAsViewSaga({
  type, payload,
}: ReturnType<typeof profileNotificationMarkAsView>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.NotificationMarkAsView,
      payload,
    });

    yield put(profileNotification());

    if (payload.callback) payload.callback();

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
