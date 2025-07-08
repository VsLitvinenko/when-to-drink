import { Router } from 'express';
import { voteGetHandle, votePostHandle } from '../handlers/votes';

export const votesRouter = Router();

votesRouter.post('/', votePostHandle);
votesRouter.get('/', voteGetHandle);