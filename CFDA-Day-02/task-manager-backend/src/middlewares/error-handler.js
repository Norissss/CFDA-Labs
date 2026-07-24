import env from '../config/env.js';

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode ?? 500;
  const isProduction = env.nodeEnv === 'production';

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && isProduction
      ? 'Terjadi kesalahan pada server.'
      : error.message,
    ...(error.details ? { errors: error.details } : {}),
    ...(!isProduction && statusCode >= 500 ? { stack: error.stack } : {})
  });
};
