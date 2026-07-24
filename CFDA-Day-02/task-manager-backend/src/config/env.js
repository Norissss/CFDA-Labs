import 'dotenv/config';

const parsePort = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const required = (name, value) => {
  if (!value) {
    throw new Error(`Environment variable ${name} wajib diisi.`);
  }
  return value;
};

const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT, 5000),
  databaseUrl: required('DATABASE_URL', process.env.DATABASE_URL),
  frontendOrigins: (process.env.FRONTEND_URL ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
};

export default env;
