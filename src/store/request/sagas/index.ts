import { takeLeading } from 'redux-saga/effects';
import { RequestActionTypes } from '../actionsTypes';
import { requestGetDataSaga } from './getData';
import { requestCreateSaga } from './create';

export default function* requestSaga() {
  yield takeLeading(RequestActionTypes.GetData, requestGetDataSaga);
  yield takeLeading(RequestActionTypes.Create, requestCreateSaga);
}
