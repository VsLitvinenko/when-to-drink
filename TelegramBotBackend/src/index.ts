import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import appSecrets from '../.appsecrets.json';
import TelegramBot from 'node-telegram-bot-api';
import { authMiddleware, dbUserMiddleware, getAuthData, getDbUserId } from './middlewares';

const bot = new TelegramBot(appSecrets.tgBotToken, { polling: true });
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  switch (text) {
    case '/start':
      const startMsg = 'Use this bot to choose dates, when you and your friends are ready for some events!';
      const options: TelegramBot.SendMessageOptions = {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Create New Event',
              web_app: { url: appSecrets.webAppUrl },
            }],
          ],
        },
      };
      await bot.sendMessage(chatId, startMsg, options);
      break;
    default:
      const defaultMsg = '';
      await bot.sendMessage(chatId, defaultMsg);
      break;
  }
});

const app = express();
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

const server = http.createServer(app);
server.listen(8080);

mongoose.Promise = Promise;
mongoose.connect(appSecrets.dbConnection);
mongoose.connection.on('connected', () => console.log('mongo connected'));
mongoose.connection.on('error', (err: Error) => console.log(err));