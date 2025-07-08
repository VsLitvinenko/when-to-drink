import { Router } from 'express';
import { votePostHandle } from '../handlers/votes';

export const votesRouter = Router();

votesRouter.post('/', votePostHandle);
votesRouter.get('/', () => {});