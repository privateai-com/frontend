import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import { 
  requestSetStatus, requestCreate,
} from 'store/request/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';

export function* requestCreateSaga({ type, payload }: ReturnType<typeof requestCreate>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.RequestsCreate,
      payload,
    });
    
    if(payload.callback) payload.callback();
    
    yield put(requestSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(requestSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
