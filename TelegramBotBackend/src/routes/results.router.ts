import { Router } from 'express';
import { resultGetHandle } from '../handlers/results';

export const resultsRouter = Router();

resultsRouter.get('/', resultGetHandle);