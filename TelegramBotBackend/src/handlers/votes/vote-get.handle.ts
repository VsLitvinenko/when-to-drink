import { getVoteById, isEventExist, isTgUserExist, isVoteExist } from '../../database';
import { getAuthData } from '../../middlewares';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}

type ReqRes = {
  dates: Array<{
    date: string;
    voteType: string;
    start?: string;
    end?: string;
  }>;
};

/*-------------------------request-------------------------*/

export async function voteGetHandle(
  req: Request<{}, ReqRes, {}, ReqQuery>,
  res: Response<ReqRes>
) {
  const tgAuth = getAuthData(res);
  const event = await isEventExist(req.query.eventId);
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event with this id');
  }
  const user = await isTgUserExist(tgAuth.user.id);
  const voteId = await isVoteExist(user, event);
  if (!voteId) {
    // user has not voted yet
    res.status(200).json({ dates: [] });
    return;
  }
  const vote = await getVoteById(voteId);
  const dates = vote.dates.map((d) => ({
    date: d.date.toISOString(),
    voteType: d.voteType,
    start: d.start ? d.start.toISOString() : undefined,
    end: d.end ? d.end.toISOString() : undefined,
  }));
  res.status(200).json({ dates });
}