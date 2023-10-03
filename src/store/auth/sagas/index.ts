import { takeLatest } from 'redux-saga/effects';
import { AuthActionTypes } from '../actionTypes';
import { authRegistrationSaga } from './registration';
import { authConfirmEmailSaga } from './confirmEmail';
import { authResendCodeEmailSaga } from './resendCodeEmail';

export default function* authSaga() {
  yield takeLatest(AuthActionTypes.Registration, authRegistrationSaga);
  yield takeLatest(AuthActionTypes.ConfirmEmail, authConfirmEmailSaga);
  yield takeLatest(AuthActionTypes.ResendConfCode, authResendCodeEmailSaga);
}
