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
  AuthRequestResetPassword = '/verification/request-reset-password',
  AuthConfirmResetPassword = '/verification/confirm-reset-password',

  ProfileAddWallet = '/profile/add-wallet',
  ProfileGet = '/profile',
  ProfileGetUser = '/profile/get-profile',
  ProfileGetAvatar = '/profile/images/avatars',
  ProfileDeleteWallet = '/profile/delete-wallet',

  ArticlesGetArticles = '/articles',
  ArticlesSearch = '/articles/search-articles',
  ArticlesGetOneArticle = '/articles/article',
  ArticlesChangeArticleAccess = '/articles/access',
  ArticlesDeleteArticle = '/articles/delete',
  ArticlesCreateArticle = '/articles/create',
  ArticlesUpdateArticle = '/articles/update',
  ArticlesGetMyArticles = '/articles/my-articles',
  ArticlesMyRequestedArticles = '/articles/my-requested-articles',
  ArticlesCancelUpload = '/articles/hide-article-from-upload',
  ArticlesPublishArticle = '/articles/publish',
  ArticlesUploadStatus = '/uploadStatusUpdate',
  ArticlesLike = '/articles/like',
  ArticlesDislike = '/articles/dislike',
  
  GraphSave = '/graph/save',

  RequestsCreate = '/requests/create',
  RequestsAnswer = '/requests/answer',
  RequestsDelete = '/requests/delete',
  RequestsMyRequests = '/requests/my-requests',
  RequestsToMe = '/requests/requests-to-me',

  ProfileUpdateProfile = '/profile/update',
  profileUploadAvatar = '/profile/upload-avatar',

  Notification = '/notifications',
  NotificationSubscribe = '/notifications/subscribe-sse',
  NotificationMarkAsView = '/notifications/mark-as-view',
  
}
