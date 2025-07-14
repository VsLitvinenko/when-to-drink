import { env } from '../env';
import { createLogChild } from '../logs';
import { ErrorRequestHandler } from 'express';

const logger = createLogChild('middleware', 'errorHandle');

export const errorHandleMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(statusCode);
  console.log('handled request error', err);
  logger.error('handled request error', err);
  res.json({
    status: res.statusCode,
    message: err.message,
    processed: true,
    stack: env.production() ? undefined : err.stack,
  });
  next();
}