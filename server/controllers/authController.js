import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

// ================= REGISTER =================
export async function register(req, res) {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const exists = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (exists.rows.length)
      return res.status(409).json({ error: 'Username already exists' });

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, username, password) VALUES ($1,$2,$3)',
      [name, username, hash]
    );

    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

// ================= LOGIN =================
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const result = await pool.query(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/* ================== REFRESH TOKEN ================== */
export function refresh(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ error: 'Missing refresh token' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });

    const accessToken = generateAccessToken({
      id: decoded.id,
    });

    res.json({ accessToken });
  });
}

/* ================== LOGOUT ================== */
export function logout(_, res) {
  res.json({ message: 'Logged out' });
}
