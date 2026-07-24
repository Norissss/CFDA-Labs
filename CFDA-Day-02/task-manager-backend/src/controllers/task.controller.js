import * as taskRepository from '../repositories/task.repository.js';
import { ApiError } from '../utils/api-error.js';

const parseCompleted = (value) => {
  if (value === undefined) return undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;

  throw new ApiError(400, 'Query completed harus bernilai true atau false.');
};

const parsePriority = (value) => {
  if (value === undefined || value === '') return undefined;

  if (!['low', 'medium', 'high'].includes(value)) {
    throw new ApiError(400, 'Query priority harus low, medium, atau high.');
  }

  return value;
};

export const getTasks = async (req, res) => {
  const tasks = await taskRepository.findAll({
    completed: parseCompleted(req.query.completed),
    priority: parsePriority(req.query.priority),
    search: typeof req.query.search === 'string'
      ? req.query.search.trim()
      : undefined,
    sortBy: req.query.sortBy,
    order: req.query.order
  });

  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

export const getTaskById = async (req, res) => {
  const task = await taskRepository.findById(req.taskId);

  if (!task) {
    throw new ApiError(404, 'Task tidak ditemukan.');
  }

  res.json({
    success: true,
    data: task
  });
};

export const createTask = async (req, res) => {
  const task = await taskRepository.create(req.validatedBody);

  res.status(201).json({
    success: true,
    message: 'Task berhasil dibuat.',
    data: task
  });
};

export const updateTask = async (req, res) => {
  const task = await taskRepository.update(
    req.taskId,
    req.validatedBody
  );

  if (!task) {
    throw new ApiError(404, 'Task tidak ditemukan.');
  }

  res.json({
    success: true,
    message: 'Task berhasil diperbarui.',
    data: task
  });
};

export const toggleTask = async (req, res) => {
  const task = await taskRepository.toggle(req.taskId);

  if (!task) {
    throw new ApiError(404, 'Task tidak ditemukan.');
  }

  res.json({
    success: true,
    message: task.completed
      ? 'Task ditandai selesai.'
      : 'Task ditandai belum selesai.',
    data: task
  });
};

export const deleteTask = async (req, res) => {
  const deletedTask = await taskRepository.remove(req.taskId);

  if (!deletedTask) {
    throw new ApiError(404, 'Task tidak ditemukan.');
  }

  res.json({
    success: true,
    message: 'Task berhasil dihapus.'
  });
};

export const getTaskStats = async (_req, res) => {
  const stats = await taskRepository.getStats();

  res.json({
    success: true,
    data: stats
  });
};
