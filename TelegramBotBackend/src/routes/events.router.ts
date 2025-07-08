import { Router } from 'express';
import { eventDeleteHandle, eventGetHandle, eventPatchHandle, eventPostHandle } from '../handlers/events';

export const eventsRouter = Router();

eventsRouter.post('/', eventPostHandle);
eventsRouter.patch('/:id', eventPatchHandle);
eventsRouter.delete('/:id', eventDeleteHandle);
eventsRouter.get('/:id', eventGetHandle);