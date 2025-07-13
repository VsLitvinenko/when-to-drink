import { createLogChild } from '../../logs';
import { createVote, isEventExist, isVoteExist, updateVote } from '../../database';
import { getDbUserId } from '../../middlewares';
import { Request, Response } from 'express';


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

type ReqRes = ReqBody;
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
  logger.info(`vote ${!voteId ? 'created' : 'updated'}`, vote);
  // convert dates to response
  const dates = vote.dates.map((d) => ({
    date: d.date.toISOString(),
    voteType: d.voteType,
    start: d.start ? d.start.toISOString() : undefined,
    end: d.end ? d.end.toISOString() : undefined,
  }));
  res.status(200).json({ dates });
}