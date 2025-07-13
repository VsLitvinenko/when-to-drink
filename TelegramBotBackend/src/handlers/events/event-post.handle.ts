import { sendMessageOnCreateEvent } from './../../telegram';
import { getAuthData, getDbUserId } from '../../middlewares';
import { createEvent } from '../../database';
import { Request, Response } from 'express';
import { createLogChild } from '../../logs';


/*-------------------------types-------------------------*/

type ReqBody = {
  name: string;
  starts: string;
  ends: string;
  description?: string;
};

type ReqRes = { id: string; };
const logger = createLogChild('handler', 'event');

/*-------------------------request-------------------------*/

export async function eventPostHandle(
  req: Request<{}, ReqRes, ReqBody>,
  res: Response<ReqRes>
) {
  const body = req.body;
  const creator = getDbUserId(res);
  if (!body.name || !body.starts || !body.ends) {
    res.status(400);
    throw new Error('Required field is missing');
  } else if (!creator) {
    res.status(417);
    throw new Error('Cannot get request creator');
  }
  const event = await createEvent({ ...body, creator});
  logger.info('event created', event);
  const userData = getAuthData(res);
  if (userData) {
    await sendMessageOnCreateEvent(userData, event as any);
  }
  res.status(200).json({ id: String(event._id) });
}