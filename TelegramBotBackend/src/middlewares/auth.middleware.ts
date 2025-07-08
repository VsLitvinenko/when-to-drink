import { InitData, parse, validate } from '@telegram-apps/init-data-node';
import { RequestHandler, Response } from 'express';
import { ApiError } from '../common';
import appSecrets from '../../.appsecrets.json';

const authDataKey = 'initData';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const headerName = 'Authorization';
  const authData = req.header(headerName);
  if (!authData) {
    const err = new ApiError(401, 'Not authorized');
    res.status(401).json(err)
    return next(err);
  }
  try {
    validate(authData, appSecrets.tgBotToken, { expiresIn: 3600 });
    res.locals[authDataKey] = parse(authData);
    return next();
  } catch (e) {
    const err = new ApiError(403, 'Forbidden');
    console.log(e);
    return next(err);
  }
}

export const getAuthData = (res: Response): InitData | undefined => {
  return res.locals[authDataKey];
}