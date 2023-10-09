import { takeLatest } from 'redux-saga/effects';
import { AuthActionTypes } from '../actionTypes';
import { authRegistrationSaga } from './registration';
import { authConfirmEmailSaga } from './confirmEmail';
import { authResendCodeEmailSaga } from './resendCodeEmail';
import { authLoginSaga } from './login';
import { authloginWalletSaga } from './loginWallet';
import { authLogoutSaga } from './logout';
import { authConfirmCodeSage } from './confirmCode';
import { authChangePasswordSaga } from './changePassword';

export default function* authSaga() {
  yield takeLatest(AuthActionTypes.Registration, authRegistrationSaga);
  yield takeLatest(AuthActionTypes.ConfirmEmail, authConfirmEmailSaga);
  yield takeLatest(AuthActionTypes.Login, authLoginSaga);
  yield takeLatest(AuthActionTypes.LoginWallet, authloginWalletSaga);
  yield takeLatest(AuthActionTypes.ResendConfCode, authResendCodeEmailSaga);
  yield takeLatest(AuthActionTypes.Logout, authLogoutSaga);
  yield takeLatest(AuthActionTypes.ConfirmCode, authConfirmCodeSage);
  yield takeLatest(AuthActionTypes.ChangePassword, authChangePasswordSaga);
}
