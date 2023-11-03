import { put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import { 
  requestSetStatus, requestGetData,
} from 'store/request/actionCreators';

export function* requestGetDataSaga({ type }: ReturnType<typeof requestGetData>) {
  try{
    yield put(requestSetStatus({ type, status: RequestStatus.REQUEST }));

    yield put(requestSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(requestSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
