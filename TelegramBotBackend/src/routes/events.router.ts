import { Router } from 'express';
import { eventGetOneHandle, eventPatchHandle, eventPostHandle } from 'handlers/events';

export const eventsRouter = Router();

eventsRouter.post('/', eventPostHandle);
eventsRouter.patch('/:id', eventPatchHandle);
eventsRouter.get('/:id', eventGetOneHandle);