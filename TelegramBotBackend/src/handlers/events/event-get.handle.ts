import { getEventById, isEventExist, IUserDb, IVoteUserDb } from '../../database';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqPar = {
  id: string;
};

type ReqRes = {
  id: string;
  name: string;
  starts: string;
  ends: string;
  description?: string;
  creator: {
    tgId: number;
    fullName: string;
    photoUrl?: string;
  };
  users: Array<{
    fullName: string;
    photoUrl?: string;
  }>;
};

/*-------------------------request-------------------------*/

export async function eventGetHandle(
  req: Request<ReqPar, ReqRes>,
  res: Response<ReqRes>
) {
  const eventId = await isEventExist(req.params.id);
  if (!eventId) {
    res.status(404);
    throw new Error('Cannot find event');
  }
  const event = await getEventById(eventId)
    .populate<{ creator: IUserDb }>('creator')
    .populate<{ votes: IVoteUserDb[] }>({
      path: 'votes',
      populate: {
        path: 'user',
        model: 'User',
      },
    });
  const creator = event.creator;
  const mappedUsers = event.votes.map((vote) => ({
    fullName: `${vote.user.firstName} ${vote.user.lastName}`,
    photoUrl: vote.user.photoUrl,
  }));
  res.status(200).json({
    id: String(event.id),
    name: event.name,
    starts: event.starts.toISOString(),
    ends: event.ends.toISOString(),
    description: event.description,
    users: mappedUsers,
    creator: {
      tgId: creator.tgId,
      fullName: `${creator.firstName} ${creator.lastName}`,
      photoUrl: creator.photoUrl,
    },
  });
}