import { ApiError } from '../utils/api-error.js';

export const validateId = (req, _res, next) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return next(new ApiError(400, 'ID task tidak valid.'));
  }

  req.taskId = id;
  next();
};
