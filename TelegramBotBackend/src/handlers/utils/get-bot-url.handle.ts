import { Request, Response } from 'express';
import { getBotUrl } from '../../telegram';

export async function getBotUrlHandle(req: Request, res: Response) {
  const botUrl = await getBotUrl();
  res.status(200).json({ botUrl });
}