// layout/header.js
import { fetchUsername } from '../api/user.js';
/* Altera DOM with Database */
const token = localStorage.getItem('token'); // ou de onde você salva
fetchUsername(token).then((username) => {
  if (username)
    document.getElementById('username').textContent = '@' + username;
});

/* Dropdown & Logout */
document.addEventListener('DOMContentLoaded', () => {
  const avatarBtn = document.getElementById('avatarbtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!avatarBtn || !dropdownMenu || !logoutBtn) return; // evita erros se algum não existir

  // abrir/fechar dropdown no click do avatar
  avatarBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que o click feche imediatamente
    dropdownMenu.classList.toggle('openDrop');
  });

  // fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!avatarBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('openDrop');
    }
  });

  // logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  });

  // fetch username
  /* const token = localStorage.getItem('token');
  fetchUsername(token).then((username) => {
    if (username)
      document.getElementById('username').textContent = '@' + username;
  }); */
});
