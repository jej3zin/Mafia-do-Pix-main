import pkg from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

export const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  connectionString:
    process.env.DATABSE_URL ||
    'postgresql://server_ox4h_user:MdNVRF2MobaqRIpwpx3biGYuytmRX9pf@dpg-d5202e3e5dus73aj8tu0-a/server_ox4h',
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL error', err);
  process.exit(1);
});
