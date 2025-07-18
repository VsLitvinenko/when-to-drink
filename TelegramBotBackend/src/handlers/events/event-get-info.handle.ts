import { format } from 'date-fns';
import { getEventById, isEventExist, IUserDb } from '../../database';
import { getAuthData } from '../../middlewares';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqPar = {
  id: string;
};

type ReqRes = {
  id: string;
  canEdit: boolean;
  name: string;
  starts: string;
  ends: string;
  description?: string;
  creator: {
    fullName: string;
    photoUrl?: string;
  };
};

/*-------------------------request-------------------------*/

export async function eventGetInfoHandle(
  req: Request<ReqPar, ReqRes>,
  res: Response<ReqRes>
) {
  const eventId = await isEventExist(req.params.id);
  if (!eventId) {
    res.status(404);
    throw new Error('Cannot find event');
  }
  const event = await getEventById(eventId).populate<{ creator: IUserDb }>('creator');
  const requestUserTgId = getAuthData(res)?.user?.id;
  const creator = event.creator;
  res.status(200).json({
    id: String(event.id),
    canEdit: requestUserTgId === creator.tgId,
    name: event.name,
    starts: format(event.starts, 'yyyy-MM-dd'),
    ends: format(event.ends, 'yyyy-MM-dd'),
    description: event.description,
    creator: {
      fullName: `${creator.firstName} ${creator.lastName}`,
      photoUrl: creator.photoUrl,
    },
  });
}