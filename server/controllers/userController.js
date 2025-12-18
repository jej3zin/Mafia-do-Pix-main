import { pool } from '../config/db.js';

export async function me(req, res) {
  const result = await pool.query(
    'SELECT id, name, username FROM users WHERE id = $1',
    [req.user.id]
  );

  res.json(result.rows[0]);
}
