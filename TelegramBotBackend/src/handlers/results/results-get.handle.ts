import { getAuthData } from '../../middlewares';
import { getEventById, IEvent, isEventExist, IUserDb, UVoteModel } from '../../database';
import { Request, Response } from 'express';
import { format } from 'date-fns';


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
  const eDates = await getEventById(eventId).select<EDates>(['starts', 'ends']);
  // get and group data from db
  const dbData = await UVoteModel
    .aggregate<DateUserGroup>()
    .match({ event: eventId })
    .unwind('$dates')
    .match({
      'dates.date': { 
        $gte: eDates.starts,
        $lte: eDates.ends,
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
      const dFormat = 'yyyy-MM-dd';
      const tFormat = "yyyy-MM-dd'T'HH:mm:ss";
      const date = format(new Date(val._id), dFormat);
      const start = val.start ? format(val.start, tFormat) : undefined;
      const end = val.end ? format(val.end, tFormat) : undefined;
      const isWithMe = val.items.some((i) => i.user.tgId === tgUserId);
      const noTimeOverlap = (start && end) ? start > end : undefined;
      const voteType = aggregateVoteType(val.items);
      const users = val.items.map((item) => ({
        fullName: `${item.user.firstName} ${item.user.lastName}`,
        photoUrl: item.user.photoUrl,
        username: item.user.username,
        voteType: item.voteType,
        start: item.start ? format(item.start, tFormat) : undefined,
        end: item.end ? format(item.end, tFormat) : undefined,
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

type EDates = Pick<IEvent, 'starts' | 'ends'>;

type DateUser = {
  user: IUserDb;
  voteType: 'ready' | 'maybe' | 'time';
  start?: string;
  end?: string;
};

type DateUserGroup = {
  _id: string;
  start: Date | null;
  end: Date | null;
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
