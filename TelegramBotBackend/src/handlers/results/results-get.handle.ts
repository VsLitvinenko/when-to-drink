import { getAuthData } from '../../middlewares';
import { getEventById, isEventExist, IUserDb, UVoteModel } from '../../database';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}
type ReqRes = {
  eventId: string;
  maxOverlap: number;
  dates: Array<{
    date: string;
    voteType: string;
    isWithMe: boolean;
    start?: string;
    end?: string;
    noTimeOverlap?: boolean;
    users: Array<{
      fullName: string;
      photoUrl?: string;
      username?: string;
      voteType: string;
      start?: string;
      end?: string;
    }>;
  }>;
}

/*-------------------------request-------------------------*/

export async function resultGetHandle(
  req: Request<{}, ReqRes, {}, ReqQuery>,
  res: Response<ReqRes>
) {
  const eventId = await isEventExist(req.query.eventId);
  if (!eventId) {
    res.status(404);
    throw new Error('Cannot find event with this id');
  }
  const tgAuthData = getAuthData(res);
  const tgUserId = tgAuthData.user?.id;
  // get event start & end dates
  const event = await getEventById(eventId);
  // get and group data from db
  const dbData = await UVoteModel
    .aggregate<DateUserGroup>()
    .match({ event: eventId })
    .unwind('$dates')
    .match({
      'dates.date': { 
        $gte: event.starts,
        $lte: event.ends,
      },
    })
    .lookup({
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user',
    })
    .unwind('$user')
    .group({
      _id: '$dates.date',
      start: { $max: '$dates.start' },
      end: { $min: '$dates.end' },
      items: {
        $push: {
          voteType: '$dates.voteType',
          start: '$dates.start',
          end: '$dates.end',
          user: '$user',
        }
      }}
    )
    .sort('_id'); 
  // convert result fields
  const convertedDates = dbData
    .map((val) => {
      const date = val._id;
      const start = val.start ?? undefined;
      const end = val.end ?? undefined;
      const isWithMe = val.items.some((i) => i.user.tgId === tgUserId);
      const noTimeOverlap = (start && end) ? start > end : undefined;
      const voteType = aggregateVoteType(val.items);
      const users = val.items.map((item) => ({
        fullName: `${item.user.firstName} ${item.user.lastName}`,
        photoUrl: item.user.photoUrl,
        username: item.user.username,
        voteType: item.voteType,
        start: item.start,
        end: item.end,
      }));
      return { date, start, end, isWithMe, noTimeOverlap, voteType, users };
    });
  // return result
  res.status(200).json({
    eventId: String(eventId),
    dates: convertedDates,
    maxOverlap: convertedDates.length > 0
      ? Math.max(...convertedDates.map((i) => i.users.length))
      : 0,
  });
}

/*-------------------------helpers-------------------------*/

type DateUser = {
  user: IUserDb;
  voteType: 'ready' | 'maybe' | 'time';
  start?: string;
  end?: string;
};

type DateUserGroup = {
  _id: string;
  start: string | null;
  end: string | null;
  items: DateUser[];
};

const aggregateVoteType = (dates: DateUser[]): string => {
  const voteTypes = dates.map((val) => val.voteType);
  const voteTypesSet = new Set(voteTypes);
  if (voteTypesSet.has('maybe')) {
    return 'maybe';
  } else if (voteTypesSet.has('time')) {
    return 'time';
  } else {
    return 'ready'
  }
};
