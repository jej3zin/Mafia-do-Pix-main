// frontend/js/user.js
export async function fetchUsername(token) {
  try {
    const res = await fetch(`${API_BASE}/users/me/username`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Erro ao buscar username');

    const data = await res.json();
    return data.username;
  } catch (err) {
    console.error(err);
    return null;
  }
}
