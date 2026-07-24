import pg from 'pg';
import env from './env.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000
});

pool.on('error', (error) => {
  console.error('PostgreSQL idle client error:', error);
});

export const testDatabaseConnection = async () => {
  const result = await pool.query('SELECT NOW() AS current_time');
  return result.rows[0].current_time;
};

export default pool;
