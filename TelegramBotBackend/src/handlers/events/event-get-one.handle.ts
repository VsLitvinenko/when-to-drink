import { getEventById, IUserDb } from './../../database';
import { Request, Response } from 'express';

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
    fullName: string;
    photoUrl?: string;
  };
};

export async function eventGetOneHandle(
  req: Request<ReqPar, ReqRes>,
  res: Response<ReqRes>
) {
  const event = await getEventById(req.params.id).populate<{ creator: IUserDb }>('creator');
  const creator = event.creator;
  console.log(event);
  res.status(200).json({
    id: String(event.id),
    name: event.name,
    starts: event.starts.toISOString(),
    ends: event.ends.toISOString(),
    description: event.description,
    creator: {
      fullName: `${creator.firstName} ${creator.lastName}`,
      photoUrl: creator.photoUrl,
    },
  });
}