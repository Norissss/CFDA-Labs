import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTaskFields } from '../src/validators/task.validator.js';

test('create task memberikan nilai default', () => {
  const result = validateTaskFields(
    { title: 'Belajar Node.js' },
    { partial: false }
  );

  assert.deepEqual(result, {
    title: 'Belajar Node.js',
    description: '',
    completed: false,
    priority: 'medium',
    dueDate: null
  });
});

test('create task menolak title kosong', () => {
  assert.throws(
    () => validateTaskFields({ title: ' ' }, { partial: false }),
    /Data task tidak valid/
  );
});

test('update task menerima partial data', () => {
  const result = validateTaskFields(
    { completed: true },
    { partial: true }
  );

  assert.deepEqual(result, { completed: true });
});

test('dueDate harus menggunakan tanggal valid', () => {
  assert.throws(
    () => validateTaskFields(
      { title: 'Test', dueDate: '2026-02-30' },
      { partial: false }
    ),
    /Data task tidak valid/
  );
});
