import { IAccessToken } from '@/interfaces/IToken';
import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';
import toast from 'react-hot-toast';
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from './constants';

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await ky
    .post(`${API_URL}/auth/refresh`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .json<IAccessToken>();

  localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
  return response.data.access_token;
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function beforeRequestHook(request: KyRequest) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
}

async function afterResponseHook(
  request: KyRequest,
  _options: NormalizedOptions,
  response: KyResponse,
) {
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();
      request.headers.set('Authorization', `Bearer ${newAccessToken}`);
      return ky(request);
    } catch {
      toast.error('Session expired. Please log in again.');
      clearTokens();
      window.location.href = '/sign-in';
      return response;
    }
  }
}

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  retry: { limit: 2, statusCodes: [401, 403, 500] },
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
});

export default api;
