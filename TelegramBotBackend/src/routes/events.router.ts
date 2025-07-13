import { eventDeleteHandle, eventGetInfoHandle, eventGetUsersHandle, eventPatchHandle, eventPostHandle } from '../handlers/events';
import { Router } from 'express';

export const eventsRouter = Router();

eventsRouter.post('/', eventPostHandle);
eventsRouter.patch('/:id', eventPatchHandle);
eventsRouter.delete('/:id', eventDeleteHandle);
eventsRouter.get('/info/:id', eventGetInfoHandle);
eventsRouter.get('/users/:id', eventGetUsersHandle);
