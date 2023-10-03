export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export enum ApiEndpoint {
  AuthLogin = '/authentication/login',
  AuthRegister = '/authentication/register',
  AuthLogout = '/authentication/logout',
  AuthRefreshToken = '/authentication/refresh-token',
  AuthChangePassword = '/authentication/reset-password',
  AuthWalletLogin = '/authentication/wallet-login',
  AuthConfirmEmail = '/verification/confirm-register',
  AuthResendCodeRegister = '/verification/resend-code-register',
  AuthSendCodeResetPassword = '/verification/send-code-reset-password',
  AuthConfirmResetPassword = '/verification/confirm-reset-password',
  
}
