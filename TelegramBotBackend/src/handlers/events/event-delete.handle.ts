import { getDbUserId } from './../../middlewares';
import { getEventById } from '../../database';
import { Request, Response } from 'express';

type ReqPar = {
  id: string;
};

type ReqRes = { id: string };

export async function eventDeleteHandle(
  req: Request<ReqPar, ReqRes>,
  res: Response<ReqRes>
) {
  const creator = getDbUserId(res);
  const event = await getEventById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event to delete');
  } else if (String(event.creator) !== String(creator)) {
    res.status(403);
    throw new Error('You have no rights to delete this event');
  }
  await event.deleteOne();
  console.log(event);
  res.status(200).json({ id: String(event._id) });
}