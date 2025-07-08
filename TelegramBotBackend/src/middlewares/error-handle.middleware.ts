import { ErrorRequestHandler } from 'express';
import env from '../../.environment.json';

export const errorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  console.log('errorHandleMiddleware');
  res.json({
    status: res.statusCode,
    message: err.message,
    stack: env.production ? '' : err.stack,
  });
}