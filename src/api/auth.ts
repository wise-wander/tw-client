import { IMessageResponse, IResponse } from '@/interfaces/IResponse';
import { ITokenPair } from '@/interfaces/IToken';
import { IUser } from '@/interfaces/IUser';
import api from '.';
import { ACCESS_TOKEN, AUTH_ROUTES, REFRESH_TOKEN } from './constants';

type IMeResponse = IResponse<IUser>;

export async function getMe() {
  const response = await api.get(AUTH_ROUTES.ME).json<IMeResponse>();
  return response;
}

export async function postSignIn(json: { email: string; password: string }) {
  const response = await api
    .post(AUTH_ROUTES.SIGN_IN, { json: json })
    .json<ITokenPair>();
  if (response.status === 200) {
    localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
  }
  return response;
}

export async function postSignUp(json: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await api
    .post(AUTH_ROUTES.SIGN_UP, { json: json })
    .json<IMessageResponse>();
  return response;
}
