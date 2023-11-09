import { takeLeading } from 'redux-saga/effects';
import { RequestActionTypes } from '../actionsTypes';
import { requestGetDataSaga } from './getData';
import { requestCreateSaga } from './create';
import { requestAnswerSaga } from './answer';
import { requestDeleteSaga } from './delete';
import { requestGetMyRequestsSaga } from './getMyRequests';
import { requestGetRequestsToMeSaga } from './getRequestsToMe';

export default function* requestSaga() {
  yield takeLeading(RequestActionTypes.GetData, requestGetDataSaga);
  yield takeLeading(RequestActionTypes.Create, requestCreateSaga);
  yield takeLeading(RequestActionTypes.Answer, requestAnswerSaga);
  yield takeLeading(RequestActionTypes.Delete, requestDeleteSaga);
  
  yield takeLeading(RequestActionTypes.GetMyRequests, requestGetMyRequestsSaga);
  yield takeLeading(RequestActionTypes.GetRequestsToMe, requestGetRequestsToMeSaga);
}
