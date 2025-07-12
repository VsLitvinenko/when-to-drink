import { env } from '../env';
import { ErrorRequestHandler } from 'express';

export const errorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(statusCode);
  console.log('errorHandleMiddleware');
  res.json({
    status: res.statusCode,
    message: err.message,
    processed: true,
    stack: env.production ? undefined : err.stack,
  });
}