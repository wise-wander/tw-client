import { IAccessToken } from '@/interfaces/IToken';
import ky, { KyRequest, KyResponse, NormalizedOptions } from 'ky';
import toast from 'react-hot-toast';
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from './constants';

function getTokens() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

async function refreshAccessToken() {
  const tokens = getTokens() || null;
  if (!tokens) {
    throw new Error('No token available');
  }

  const response = await ky
    .post(`${API_URL}auth/refresh`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    })
    .json<IAccessToken>();

  localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
  return response.data.access_token;
}

function beforeRequestHook(request: KyRequest) {
  const tokens = getTokens() || null;
  if (tokens) {
    request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }
}

async function afterResponseHook(
  request: KyRequest,
  _options: NormalizedOptions,
  response: KyResponse,
) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (response.status === 401 && token) {
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
  retry: { limit: 1, statusCodes: [401, 403, 500] },
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
});

export default api;
