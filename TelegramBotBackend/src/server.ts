import { authMiddleware, dbUserMiddleware, errorHandleMiddleware, getAuthData, getDbUserId } from './middlewares';
import { eventsRouter, resultsRouter, utilsRouter, votesRouter } from './routes';
import { env } from './env';
import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();

export const initServer = () => {
  app.use(cors({ credentials: true }));
  app.use(compression());
  app.use(bodyParser.json());

  app.use(authMiddleware);
  app.use(dbUserMiddleware);

  // health check
  app.post('/health', (req, res) => {
    const authData = getAuthData(res);
    const dbUserId = getDbUserId(res);
    console.log('TG AUTH DATA', authData);
    res.json({ tgAuth: authData, dbId: dbUserId });
  });

  // routes
  app.use('/api/events', eventsRouter);
  app.use('/api/votes', votesRouter);
  app.use('/api/results', resultsRouter);
  app.use('/api/utils', utilsRouter);

  // error handler
  app.use(errorHandleMiddleware);

  const server = http.createServer(app);
  server.listen(env.port);
}