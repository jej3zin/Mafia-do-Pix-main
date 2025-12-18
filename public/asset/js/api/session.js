// api/session.js
import { API_BASE } from './config.js';

const TOKEN_KEY = 'access_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

export async function refreshToken(refreshToken) {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error('Refresh inválido');

  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.accessToken);
  return data.accessToken;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}
