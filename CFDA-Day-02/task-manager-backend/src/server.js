import app from './app.js';
import env from './config/env.js';
import pool, { testDatabaseConnection } from './config/database.js';

let server;

const startServer = async () => {
  try {
    const databaseTime = await testDatabaseConnection();

    server = app.listen(env.port, () => {
      console.log(`Task Manager API berjalan di http://localhost:${env.port}`);
      console.log(`PostgreSQL terhubung. Waktu database: ${databaseTime}`);
    });
  } catch (error) {
    console.error('Server gagal dijalankan:', error.message);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`\n${signal} diterima. Menutup server...`);

  if (server) {
    server.close(async () => {
      await pool.end();
      console.log('Server dan koneksi database telah ditutup.');
      process.exit(0);
    });
  } else {
    await pool.end();
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
