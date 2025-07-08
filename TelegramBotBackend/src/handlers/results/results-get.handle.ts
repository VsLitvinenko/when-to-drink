import { getAllEventVotes, isEventExist, IUser } from '../../database';
import { format, max, min } from 'date-fns';
import { Request, Response } from 'express';


/*-------------------------types-------------------------*/

type ReqQuery = {
  eventId: string;
}

type ReqRes = {
  eventId: string;
  results: Array<{
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
};

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
  const votes = await getAllEventVotes(event).populate<{ user: IUser }>('user');
  const datesWithUser: DateUser[] = votes.flatMap((vote) =>
    vote.dates.map((d) => ({
      ...d.toObject(),
      user: vote.user,
    }))
  );
  // fill dates map
  const datesMap = new Map<string, DateUser[]>();
  datesWithUser.forEach((item) => {
    const fDate = formatDate(item.date);
    if (datesMap.has(fDate)) {
      datesMap.get(fDate).push(item);
    } else {
      datesMap.set(fDate, [item]);
    }
  });
  // aggregate values
  const results = Array.from(datesMap.entries()).map(([date, values]) => {
    const voteType = aggregateVoteType(values);
    const start = aggregateStartTime(values)?.toISOString();
    const end = aggregateEndTime(values)?.toISOString();
    const users = values.map((item) => ({
      fullName: `${item.user.firstName} ${item.user.lastName}`,
      photoUrl: item.user.photoUrl,
      voteType: item.voteType,
      start: item.start?.toISOString(),
      end: item.end?.toISOString(),
    }));
    return { date, voteType, start, end, users };
  });
  // json result
  res.status(200).json({
    eventId: String(event),
    results: results.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    }),
  });
}

/*-------------------------helpers-------------------------*/

type DateUser = {
  date: Date;
  voteType: 'ready' | 'maybe' | 'time';
  start?: Date;
  end?: Date;
  user: IUser;
};

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

const aggregateStartTime = (dates: DateUser[]): Date | undefined => {
  const startDates = dates.filter((i) => !!i.start).map((i) => i.start!);
  return startDates.length > 0 ? max(startDates) : undefined;
}

const aggregateEndTime = (dates: DateUser[]): Date | undefined => {
  const endDates = dates.filter((i) => !!i.end).map((i) => i.end!);
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
