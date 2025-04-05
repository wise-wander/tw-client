import { IMessageResponse, IResponse } from '@/interfaces/IResponse';
import { IUser } from '@/interfaces/IUser';
import api from '.';
import { AUTH_ROUTES } from './constants';

type IMeResponse = IResponse<IUser>;

export async function getMe() {
  const response = await api.get(AUTH_ROUTES.ME).json<IMeResponse>();
  return response;
}

export async function postSignIn(json: { email: string; password: string }) {
  const response = await api
    .post(AUTH_ROUTES.SIGN_IN, { json: json })
    .json<IMessageResponse>();
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
