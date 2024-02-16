export enum AuthActionTypes {
  SetState = 'AUTH.SET_STATE',
  SetStatus = 'AUTH.SET_STATUS',
  Registration = 'AUTH.REGISTRATION',
  Login = 'AUTH.LOGIN',
  LoginWallet = 'AUTH.LOGIN_WALLET',
  Logout = 'AUTH.LOGOUT',
  ConfirmEmail = 'AUTH.CONFIRM_EMAIL',
  OnUpdateAccessTokenFinish = 'AUTH.ON_UPDATE_ACCESS_TOKEN_FINISH',
  ResendConfCode = 'AUTH.RESEND_CONF_CODE',
  ConfirmCode = 'AUTH.SENT_VERIFICATION_CODE',
  RequestResetPassword = 'AUTH.REQUEST_RESET_PASSWORD',
  ChangePassword = 'AUTH.CHANGE_PASSWORD',
}
