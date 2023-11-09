import { call, put, select } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  Pagination,
  RequestStatus,
} from 'types';
import { 
  requestSetStatus, requestAnswer, requestToMe,
} from 'store/request/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { requestSelectors } from '../selectors';

export function* requestAnswerSaga({ type, payload }: ReturnType<typeof requestAnswer>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'PUT',
      endpoint: ApiEndpoint.RequestsAnswer,
      payload,
    });
    
    const pagination: Pagination = yield select(requestSelectors.getProp('pagination'));
    if (pagination) {
      yield put(requestToMe({
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
