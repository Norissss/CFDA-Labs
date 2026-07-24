import { ApiError } from '../utils/api-error.js';

export const notFound = (req, _res, next) => {
  next(new ApiError(404, `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`));
};
