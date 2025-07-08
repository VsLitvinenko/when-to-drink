import { getDbUserId } from './../../middlewares';
import { getEventById, updateEvent } from '../../database';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqPar = {
  id: string;
};

type ReqBody = {
  name?: string;
  starts?: string;
  ends?: string;
  description?: string;
};

type ReqRes = ReqBody & { id: string };

/*-------------------------request-------------------------*/

export async function eventPatchHandle(
  req: Request<ReqPar, ReqRes, ReqBody>,
  res: Response<ReqRes>
) {
  const body = req.body;
  const creator = getDbUserId(res);
  const event = await getEventById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event to modify');
  } else if (String(event.creator) !== String(creator)) {
    res.status(403);
    throw new Error('You have no rights to modify this event');
  }
  const newEvent = await updateEvent(event._id, body);
  res.status(200).json({
    id: String(newEvent._id),
    name: newEvent.name,
    starts: newEvent.starts.toISOString(),
    ends: newEvent.ends.toISOString(),
    description: newEvent.description,
  }); 
}