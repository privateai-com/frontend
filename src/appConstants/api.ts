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

  ProfileAddWallet = '/profile/add-wallet',
  ProfileGet = '/profile',
  ProfileGetAvatar = '/profile/images/avatars',
  ProfileDeleteWallet = '/profile/delete-wallet',

  ArticlesGetArticles = '/articles',
  ArticlesGetOneArticle = '/articles/article',
  ArticlesChangeArticleAccess = '/articles/access',
  ArticlesDeleteArticle = '/articles/delete',
  ArticlesCreateArticle = '/articles/create',
  ArticlesUpdateArticle = '/articles/update',
  ArticlesGetMyArticles = '/articles/my-articles',
  ArticlesMyRequestedArticles = '/articles/my-requested-articles',
  ArticlesPublishArticle = '/articles/publish',
  
  GraphSave = '/graph/save',

  RequestsCreate = '/requests/create',
  RequestsAnswer = '/requests/answer',
  RequestsDelete = '/requests/delete',
  RequestsMyRequests = '/requests/my-requests',
  RequestsToMe = '/requests/requests-to-me',

  ProfileUpdateProfile = '/profile/update',
  profileUploadAvatar = '/profile/upload-avatar',
}
