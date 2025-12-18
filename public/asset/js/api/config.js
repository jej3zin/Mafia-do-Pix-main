// api/config.js
window.API_BASE =
  location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://mafia-do-pix-main.onrender.com';

const API_BASE = window.API_URL || window.API_BASE;
