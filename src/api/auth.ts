import { IApiResponse } from '@/interfaces/IApiResponse';
import { ILoginRequest } from '@/interfaces/requests/ILoginRequest';
import request from '.';

const API_PREFIX = '/auth';

export function postLogIn(body: ILoginRequest) {
  return request.post<IApiResponse<string>>(`${API_PREFIX}/login`, body);
}
