import { call, put, select } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  Pagination,
  RequestStatus,
} from 'types';
import { 
  requestSetStatus, requestDelete, requestGetMyRequests,
} from 'store/request/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { requestSelectors } from '../selectors';

export function* requestDeleteSaga({ type, payload }: ReturnType<typeof requestDelete>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'DELETE',
      endpoint: ApiEndpoint.RequestsDelete,
      payload,
    });
    
    const pagination: Pagination = yield select(requestSelectors.getProp('pagination'));
    if (pagination) {
      yield put(requestGetMyRequests({
        ...pagination,
        limit: +pagination.offset + +pagination.limit,
        offset: 0,
      }));
    }
    
    if(payload.callback) payload.callback();
    
    yield put(requestSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(requestSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
