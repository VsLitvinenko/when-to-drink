import { getDbUserId } from './../../middlewares';
import { getEventById, IEventDb, updateEvent } from '../../database';
import { Request, Response } from 'express';
import { createLogChild } from '../../logs';
import { format } from 'date-fns';


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
const logger = createLogChild('handler', 'event');

/*-------------------------request-------------------------*/

export async function eventPatchHandle(
  req: Request<ReqPar, ReqRes, ReqBody>,
  res: Response<ReqRes>
) {
  const body = req.body;
  const creator = getDbUserId(res);
  const event = await getEventById(req.params.id).select<ECreator>('creator');
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event to modify');
  } else if (String(event.creator) !== String(creator)) {
    res.status(403);
    throw new Error('You have no rights to modify this event');
  }
  const newEvent = await updateEvent(event._id, body);
  logger.info('event updated', newEvent);
  res.status(200).json({
    id: String(newEvent._id),
    name: newEvent.name,
    starts: format(newEvent.starts, 'yyyy-MM-dd'),
    ends: format(newEvent.ends, 'yyyy-MM-dd'),
    description: newEvent.description,
  }); 
}

/*-------------------------helpers-------------------------*/

type ECreator = Pick<IEventDb, 'creator'>;