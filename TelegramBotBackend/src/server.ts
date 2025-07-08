import { authMiddleware, dbUserMiddleware, errorHandleMiddleware, getAuthData, getDbUserId } from './middlewares';
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

  // routes
  app.get('/api', (req, res) => {
    const authData = getAuthData(res);
    const dbUserId = getDbUserId(res);
    console.log('TG AUTH DATA', authData);
    res.json({ id: dbUserId }).end();
  });

  // error handler
  app.use(errorHandleMiddleware);

  const server = http.createServer(app);
  server.listen(8080);
}