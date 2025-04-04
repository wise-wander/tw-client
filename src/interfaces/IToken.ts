import { IResponse } from './IResponse';

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type ITokenPair = IResponse<TokenResponse>;
export type IAccessToken = IResponse<Omit<TokenResponse, 'refresh_token'>>;
