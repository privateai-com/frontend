export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export enum ApiEndpoint {
  AuthLogin = '/user/auth',
  AuthLogout = '/user/disconnect',
}
