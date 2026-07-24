import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pool from '../src/config/database.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const sqlPath = path.resolve(currentDirectory, '../database/init.sql');

try {
  const sql = await readFile(sqlPath, 'utf8');
  await pool.query(sql);
  console.log('Database berhasil diinisialisasi.');
} catch (error) {
  console.error('Gagal menginisialisasi database:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
