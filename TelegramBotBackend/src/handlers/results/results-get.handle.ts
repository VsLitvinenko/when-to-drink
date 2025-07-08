import { getAuthData } from '../../middlewares';
import { Request, Response } from 'express';

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

export async function resultGetHandle(
  req: Request<{}, ReqRes, {}, ReqQuery>,
  res: Response<ReqRes>
) {
  
}