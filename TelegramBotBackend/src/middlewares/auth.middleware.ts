import { InitData, parse, validate } from '@telegram-apps/init-data-node';
import { RequestHandler, Response } from 'express';
import env from '../../.environment.json';

const authDataKey = 'initData';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const headerName = 'Authorization';
  const authData = req.header(headerName);
  if (!authData) {
    res.status(401);
    return next(new Error('You are not authorized'));
  }
  try {
    // two weeks auth token expire (dev mode)
    validate(authData, env.tgBotToken, { expiresIn: 3600 * 24 * 14 });
    res.locals[authDataKey] = parse(authData);
    return next();
  } catch (e) {
    res.status(403);
    return next(new Error('Your auth data is invalid'));
  }
}

export const getAuthData = (res: Response): InitData | undefined => {
  return res.locals[authDataKey];
}