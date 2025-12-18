// server/index.js
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { pool } from './config/db.js';

import authRoutes from './routes/authroutes.js';
import userRoutes from './routes/userroutes.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:5432',
      'https://mafiadopix.netlify.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  })
);

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// health check
app.get('/health', async (_, res) => {
  const result = await pool.query('SELECT 1');
  res.json({ status: 'ok', db: result.rowCount === 1 });
});

app.listen(3000, () => console.log('🔥 Server on'));
