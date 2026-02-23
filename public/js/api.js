const API_BASE = '/auth';
const USERS_BASE = '/users';

const getToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

const tryRefresh = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ refreshToken: refresh }),
    });
    const data = await res.json();
    if (!res.ok) return false;
    setTokens(data.data.accessToken, data.data.refreshToken);
    return true;
  } catch {
    return false;
  }
};

const authFetch = async (url, options = {}) => {
  let res = await fetch(url, { ...options, headers: authHeaders() });
  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      res = await fetch(url, { ...options, headers: authHeaders() });
    } else {
      clearTokens();
      window.location.href = '/login.html';
      return;
    }
  }
  return handleResponse(res);
};

const api = {
  register: (name, email, password) =>
    fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ name, email, password }),
    }).then(handleResponse),

  login: (email, password) =>
    fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  logout: () =>
    fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ refreshToken: getRefreshToken() }),
    }).then(handleResponse),

  getMe: () => authFetch(`${API_BASE}/me`),

  getUsers: (page = 1, limit = 10) =>
    authFetch(`${USERS_BASE}?page=${page}&limit=${limit}`),

  createUser: (name) =>
    authFetch(USERS_BASE, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),

  updateUser: (id, name) =>
    authFetch(`${USERS_BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    }),

  deleteUser: (id) =>
    authFetch(`${USERS_BASE}/${id}`, { method: 'DELETE' }),
};

const showToast = (message, type = 'success') => {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
};

const requireAuth = () => {
  if (!getToken()) {
    window.location.href = '/login.html';
  }
};

const redirectIfAuth = () => {
  if (getToken()) {
    window.location.href = '/dashboard.html';
  }
};
