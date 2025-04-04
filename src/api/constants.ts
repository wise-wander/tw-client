export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export class AUTH_ROUTES {
  static ME = '/auth/me';
  static SIGN_IN = '/auth/sign-in';
  static SIGN_UP = '/auth/sign-up';
  static REFRESH = '/auth/refresh';
}
