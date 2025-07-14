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
    logger.warn('Not authorized user', req);
    return next(new Error('You are not authorized'));
  }
  try {
    // two weeks auth token expire (dev mode)
    validate(authData, env.tgToken(), { expiresIn: env.tgTokenExpiresIn() });
    res.locals[authDataKey] = parse(authData);
    return next();
  } catch (e) {
    res.status(403);
    logger.warn('Forbidden user', req);
    return next(new Error('Your auth data is invalid'));
  }
}

export const getAuthData = (res: Response): InitData | undefined => {
  return res.locals[authDataKey];
}