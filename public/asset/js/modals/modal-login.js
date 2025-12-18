const API_BASE = window.API_BASE;
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('systemlogin');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  const modalTitle = document.getElementById('modalTitle');
  const switchBtn = document.getElementById('switchMode');
  const switchText = document.getElementById('switchText');

  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');

  const registerName = document.getElementById('registerName');
  const registerUsername = document.getElementById('registerUsername');
  const registerPassword = document.getElementById('registerPassword');

  // =========================
  // TOKEN HELPERS
  // =========================
  const TOKEN_KEY = 'access_token';

  function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // =========================
  // MODAL STATE
  // =========================
  let mode = loginForm.hidden ? 'register' : 'login';

  function switchMode(forceMode = null) {
    mode = forceMode ?? (mode === 'login' ? 'register' : 'login');

    const isLogin = mode === 'login';

    loginForm.hidden = !isLogin;
    registerForm.hidden = isLogin;

    modalTitle.textContent = isLogin ? 'Login' : 'Registrar';
    switchText.textContent = isLogin ? 'Não tem conta?' : 'Já tem conta?';
    switchBtn.textContent = isLogin ? 'Registrar' : 'Login';
  }

  switchBtn.addEventListener('click', () => switchMode());

  // =========================
  // AUTO LOGIN CHECK
  // =========================
  if (isLoggedIn()) {
    modal.style.display = 'none';
    return;
  } else {
    modal.style.display = 'flex';
  }

  // =========================
  // LOGIN - System Login Backend
  // =========================
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username || !password) {
      shakeError();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Login inválido');

      const { accessToken } = await res.json();

      saveToken(accessToken);
      modal.style.display = 'none';

      console.log('TOKEN SALVO', accessToken);
    } catch {
      shakeError();
    }
  });

  // =========================
  // REGISTER
  // =========================
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = registerName.value.trim();
    const username = registerUsername.value.trim();
    const password = registerPassword.value.trim();

    if (!name || !username || !password) {
      shakeError();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
      });

      if (!res.ok) throw new Error('Erro ao registrar');

      console.log('USER CRIADO');
      switchMode('login');
    } catch {
      shakeError();
    }
  });

  // =========================
  // SHAKE ERROR
  // =========================
  function shakeError() {
    modal.classList.add('error');
    setTimeout(() => modal.classList.remove('error'), 500);
  }
});
