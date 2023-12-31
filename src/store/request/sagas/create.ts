import { call, put, select } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  Pagination,
  RequestStatus,
} from 'types';
import { 
  requestSetStatus, requestCreate,
} from 'store/request/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { articlesGetAll } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';

export function* requestCreateSaga({ type, payload }: ReturnType<typeof requestCreate>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.RequestsCreate,
      payload,
    });
    
    const pagination: Pagination = yield select(articlesSelectors.getProp('pagination'));
    if (pagination) {
      yield put(articlesGetAll({
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
