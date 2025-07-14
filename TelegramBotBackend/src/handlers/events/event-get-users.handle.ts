import { getVotesByEvent, isEventExist, IUserDb } from '../../database';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqPar = {
  id: string;
};

type ReqRes = Array<{
  fullName: string;
  photoUrl?: string;
  username?: string;
}>

/*-------------------------request-------------------------*/

export async function eventGetUsersHandle(
  req: Request<ReqPar, ReqRes>,
  res: Response<ReqRes>
) {
  const eventId = await isEventExist(req.params.id);
  if (!eventId) {
    res.status(404);
    throw new Error('Cannot find event');
  }
  const votes = await getVotesByEvent(eventId).populate<{ user: IUserDb }>('user');
  if (!votes || votes.length === 0) {
    res.status(200).json([]);
    return
  }
  const mappedUsers = votes.map((vote) => ({
    fullName: `${vote.user.firstName} ${vote.user.lastName}`,
    photoUrl: vote.user.photoUrl,
    username: vote.user.username,
  }));
  res.status(200).json(mappedUsers);
}