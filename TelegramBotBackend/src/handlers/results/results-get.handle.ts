import { isEventExist, IUserDb, UVoteModel } from '../../database';
import { max, min } from 'date-fns';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}
type ReqRes = Array<{
  date: string;
  voteType: string;
  start?: string;
  end?: string;
  users: Array<{
    fullName: string;
    photoUrl?: string;
    voteType: string;
    start?: string;
    end?: string;
  }>;
}>;

/*-------------------------request-------------------------*/

export async function resultGetHandle(
  req: Request<{}, ReqRes, {}, ReqQuery>,
  res: Response<ReqRes>
) {
  const event = await isEventExist(req.query.eventId);
  if (!event) {
    res.status(404);
    throw new Error('Cannot find event with this id');
  }
  // get and group data from db
  const dbData = await UVoteModel
    .aggregate<{ _id: string, items: DateUser[] }>()
    .match({ event })
    .lookup({
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user',
    })
    .unwind('$user')
    .unwind('$dates')
    .group({
      _id: '$dates.date',
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
  // convert answer 
  const convertedData = dbData.map((val) => {
    const date = val._id;
    const voteType = aggregateVoteType(val.items);
    const start = aggregateStartTime(val.items)?.toISOString();
    const end = aggregateEndTime(val.items)?.toISOString();
    const users = val.items.map((item) => ({
      fullName: `${item.user.firstName} ${item.user.lastName}`,
      photoUrl: item.user.photoUrl,
      voteType: item.voteType,
      start: item.start,
      end: item.end,
    }));
    return { date, voteType, start, end, users };
  });
  // return result
  res.status(200).json(convertedData);
}

/*-------------------------helpers-------------------------*/

type DateUser = {
  user: IUserDb;
  voteType: 'ready' | 'maybe' | 'time';
  start?: string;
  end?: string;
};

const aggregateStartTime = (dates: DateUser[]): Date | undefined => {
  const startDates = dates.filter((i) => !!i.start).map((i) => new Date(i.end));
  return startDates.length > 0 ? max(startDates) : undefined;
}

const aggregateEndTime = (dates: DateUser[]): Date | undefined => {
  const endDates = dates.filter((i) => !!i.end).map((i) => new Date(i.end));
  return endDates.length > 0 ? min(endDates) : undefined;
}

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
