import express from 'express';
import { authenticate } from '../middleware/authprotection.js';
import { me } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', authenticate, me);

/* ============== VAI PARA FRONT ============== */
// ============== USERNAME ================
router.get('/me/username', async (req, res) => {
  const userId = req.user.id; // vem do middleware de auth
  const result = await pool.query('SELECT username FROM users WHERE id = $1', [
    userId,
  ]);
  if (result.rows.length === 0)
    return res.status(404).json({ error: 'User not found' });
  res.json({ username: result.rows[0].username });
});
export default router;
