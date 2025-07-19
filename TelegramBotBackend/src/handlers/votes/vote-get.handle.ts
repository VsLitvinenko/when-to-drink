import { format } from 'date-fns';
import { getVoteById, isEventExist, isTgUserExist, isVoteExist, IVoteDb } from '../../database';
import { getAuthData } from '../../middlewares';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}

type ReqRes = {
  alreadyVoted: boolean;
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
    res.status(200).json({ dates: [], alreadyVoted: false });
    return;
  }
  const vote = await getVoteById(voteId).select<VDates>('dates');
  // convert dates
  const dFormat = 'yyyy-MM-dd';
  const tFormat = "yyyy-MM-dd'T'HH:mm:ss";
  const dates = vote.dates.map((d) => ({
    date: format(d.date, dFormat),
    voteType: d.voteType,
    start: d.start ? format(d.start, tFormat) : undefined,
    end: d.end ? format(d.end, tFormat) : undefined,
  }));
  res.status(200).json({ dates, alreadyVoted: true });
}


/*-------------------------helpers-------------------------*/

type VDates = Pick<IVoteDb, 'dates'>;