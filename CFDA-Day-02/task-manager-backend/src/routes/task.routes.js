import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTaskStats,
  toggleTask,
  updateTask
} from '../controllers/task.controller.js';
import { asyncHandler } from '../utils/async-handler.js';
import { validateId } from '../middlewares/validate-id.js';
import {
  validateCreateTask,
  validateUpdateTask
} from '../validators/task.validator.js';

const router = Router();

router.get('/', asyncHandler(getTasks));
router.get('/stats', asyncHandler(getTaskStats));
router.get('/:id', validateId, asyncHandler(getTaskById));
router.post('/', validateCreateTask, asyncHandler(createTask));
router.put('/:id', validateId, validateUpdateTask, asyncHandler(updateTask));
router.patch('/:id', validateId, validateUpdateTask, asyncHandler(updateTask));
router.patch('/:id/toggle', validateId, asyncHandler(toggleTask));
router.delete('/:id', validateId, asyncHandler(deleteTask));

export default router;
