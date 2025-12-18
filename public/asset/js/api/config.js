// api/config.js
window.API_BASE =
  location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'postgresql://server_ox4h_user:MdNVRF2MobaqRIpwpx3biGYuytmRX9pf@dpg-d5202e3e5dus73aj8tu0-a/server_ox4h';

const API_BASE = window.API_URL || window.API_BASE;
