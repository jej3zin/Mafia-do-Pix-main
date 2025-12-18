import 'dotenv/config';

/**
 * Variáveis obrigatórias
 */
const REQUIRED_ENVS = [
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'ACCESS_TOKEN_SECRET',
];

/**
 * Validação de ambiente
 */
for (const key of REQUIRED_ENVS) {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
}

/**
 * Export único e organizado
 */
export const env = {
  app: {
    port: Number(process.env.PORT) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};
