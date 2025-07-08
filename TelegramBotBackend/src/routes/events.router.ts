import { Router } from 'express';
import { eventDeleteHandle, eventGetOneHandle, eventPatchHandle, eventPostHandle } from '../handlers/events';

export const eventsRouter = Router();

eventsRouter.post('/', eventPostHandle);
eventsRouter.patch('/:id', eventPatchHandle);
eventsRouter.get('/:id', eventGetOneHandle);
eventsRouter.delete('/:id', eventDeleteHandle);