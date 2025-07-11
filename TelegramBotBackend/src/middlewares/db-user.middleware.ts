import { RequestHandler, Response } from 'express';
import { getAuthData } from './auth.middleware';
import { createUser, isTgUserExist, IUser, updateUser } from '../database';

const userIdKey = 'dbUserId';
const handleMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

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
    const userAsync = !dbId ? createUser(iUser) : updateUser(dbId, iUser);
    res.locals[userIdKey] = (await userAsync)._id;
    return next();
  } catch (e) {
    res.status(400);
    return next(e);
  }
};

export const getDbUserId = (res: Response): any => {
  return res.locals[userIdKey];
};