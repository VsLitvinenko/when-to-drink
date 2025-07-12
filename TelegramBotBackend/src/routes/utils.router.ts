import { Router } from 'express';
import { getBotUrlHandle } from '../handlers/utils';

export const utilsRouter = Router();

utilsRouter.get('/bot-url', getBotUrlHandle);