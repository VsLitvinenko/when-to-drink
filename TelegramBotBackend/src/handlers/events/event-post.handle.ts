import { getDbUserId } from '../../middlewares';
import { createEvent } from '../../database';
import { Request, Response } from 'express';

type ReqBody = {
  name: string;
  starts: string;
  ends: string;
  description?: string;
};

type ReqRes = {
  id: string;
};

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
  console.log(event);
  res.status(200).json({ id: String(event._id) });
}