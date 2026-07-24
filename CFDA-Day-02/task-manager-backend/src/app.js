import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import taskRoutes from './routes/task.routes.js';
import { ApiError } from './utils/api-error.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

const corsOptions = {
  origin(origin, callback) {
    if (
      !origin
      || env.frontendOrigins.includes('*')
      || env.frontendOrigins.includes(origin)
    ) {
      callback(null, true);
      return;
    }

    callback(new ApiError(403, `Origin ${origin} tidak diizinkan oleh CORS.`));
  }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Task Manager API aktif.',
    documentation: '/api/health'
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API dalam kondisi sehat.',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
