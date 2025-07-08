import { RequestHandler, Response } from 'express';
import { getAuthData } from './auth.middleware';
import { createUser, getUserByTgId, IUser, updateUser } from '../database';
import { InitData } from '@telegram-apps/init-data-node';

const userIdKey = 'dbUserId';
const handleMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export const dbUserMiddleware: RequestHandler = async (req, res, next) => {
  if (!handleMethods.has(req.method)) {
    return next();
  }
  try {
    const authData = getAuthData(res);
    const user = await getUserByTgId(authData.user.id);
    const iUser = formatIUser(authData);
    console.log(!user ? 'CREATE DB USER' : 'UPDATE DB USER');
    const userAsync = !user ? createUser(iUser) : updateUser(user._id, iUser);
    res.locals[userIdKey] = (await userAsync)._id;
    return next();
  } catch (e) {
    res.status(400);
    return next(e);
  }
}

export const getDbUserId = (res: Response): any => {
  return res.locals[userIdKey];
}

const formatIUser = (authData: InitData): IUser => {
  return {
    tgId: authData.user.id,
    username: authData.user.username,
    firstName: authData.user.first_name,
    lastName: authData.user.last_name,
    photoUrl: authData.user.photo_url,
  };
};