import { createLogChild } from '../../logs';
import { createVote, isEventExist, isVoteExist, updateVote } from '../../database';
import { getDbUserId } from '../../middlewares';
import { Request, Response } from 'express';
import { format } from 'date-fns';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}

type ReqBody = {
  dates: Array<{
    date: string;
    voteType: string;
    start?: string;
    end?: string;
  }>;
};

type ReqRes = ReqBody & { alreadyVoted: boolean };
const logger = createLogChild('handler', 'vote');

/*-------------------------request-------------------------*/

export async function votePostHandle(
  req: Request<{}, ReqRes, ReqBody, ReqQuery>,
  res: Response<ReqRes>
) {
  const body = req.body;
  const user = getDbUserId(res);
  const event = await isEventExist(req.query.eventId);
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event with this id');
  } else if (!body.dates) {
    res.status(400);
    throw new Error('Required field is missing');
  } else if (!user) {
    res.status(417);
    throw new Error('Cannot get sender user id');
  }
  const voteId = await isVoteExist(user, event);
  const vote = await (!voteId ?  createVote({ user, event, ...body}) : updateVote(voteId, body));
  console.log(`vote ${!voteId ? 'created' : 'updated'}`, vote);
  logger.info(`vote ${!voteId ? 'created' : 'updated'}`, vote);
  // convert dates to response
  const dFormat = 'yyyy-MM-dd';
  const tFormat = "yyyy-MM-dd'T'HH:mm:ss";
  const dates = vote.dates.map((d) => ({
    date: format(d.date, dFormat),
    voteType: d.voteType,
    start: d.start ? format(d.start, tFormat) : undefined,
    end: d.end ? format(d.end, tFormat) : undefined,
  }));
  res.status(200).json({ dates, alreadyVoted: Boolean(voteId) });
}