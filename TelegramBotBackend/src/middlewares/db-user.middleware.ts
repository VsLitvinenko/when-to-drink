import { RequestHandler, Response } from 'express';
import { getAuthData } from './auth.middleware';
import { createUser, isTgUserExist, IUser, updateUser } from '../database';
import { createLogChild } from '../logs';

const userIdKey = 'dbUserId';
const handleMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const logger = createLogChild('middleware', 'dbUser');

export const dbUserMiddleware: RequestHandler = async (req, res, next) => {
  if (!handleMethods.has(req.method)) {
    return next();
  }
  try {
    const authData = getAuthData(res);
    const dbId = await isTgUserExist(authData.user.id);
    const iUser: IUser = {
      tgId: authData.user.id,
      username: authData.user.username,
      firstName: authData.user.first_name,
      lastName: authData.user.last_name,
      photoUrl: authData.user.photo_url,
    };
    const user = await (!dbId ? createUser(iUser) : updateUser(dbId, iUser));
    logger.info(`database user ${!dbId ? 'created' : 'updated'}`, user);
    res.locals[userIdKey] = user._id;
    return next();
  } catch (e) {
    logger.error('Create user error', e);
    res.status(400);
    return next(e);
  }
};

export const getDbUserId = (res: Response): any => {
  return res.locals[userIdKey];
};