import { InitData, parse, validate } from '@telegram-apps/init-data-node';
import { env } from '../env';
import { RequestHandler, Response } from 'express';
import { createLogChild } from '../logs';

const authDataKey = 'initData';
const logger = createLogChild('middleware', 'auth');

export const authMiddleware: RequestHandler = (req, res, next) => {
  const headerName = 'Authorization';
  const authData = req.header(headerName);
  if (!authData) {
    res.status(401);
    console.warn('Not authorized user', req);
    logger.warn('Not authorized user', req);
    return next(new Error('You are not authorized'));
  }
  try {
    validate(authData, env.tgToken(), { expiresIn: env.tgTokenExpiresIn() });
    res.locals[authDataKey] = parse(authData);
    return next();
  } catch (e) {
    res.status(403);
    console.log('Forbidden user', req);
    logger.warn('Forbidden user', req);
    return next(new Error('Your auth data is invalid'));
  }
}

export const getAuthData = (res: Response): InitData | undefined => {
  return res.locals[authDataKey];
}