import { call, put, select } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestArticle,
  RequestStatus,
  RequestState,
} from 'types';
import { 
  requestSetStatus, requestGetMyRequests, requestSetState,
} from 'store/request/actionCreators';
import { ApiEndpoint } from 'appConstants';
import { callApi, getApiQueries } from 'api';
import { requestSelectors } from 'store/request/selectors';

export function* requestGetMyRequestsSaga({ 
  type, payload,
}: ReturnType<typeof requestGetMyRequests>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: [RequestArticle[], number] } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.RequestsMyRequests + getApiQueries(payload),
    });
    
    const myRequests: RequestState['myRequests'] = payload.offset !== 0 ? yield select(
      requestSelectors.getProp('myRequests'),
    ) : [];
    
    yield put(requestSetState({ 
      myRequests: [...myRequests, ...data[0]],
      total: data[1], 
      pagination: payload,
    }));

    yield put(requestSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(requestSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
