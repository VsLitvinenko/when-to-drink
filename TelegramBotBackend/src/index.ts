import mongoose from 'mongoose';
import { initTgBot } from './telegram';
import { initServer } from './server';
import { logger } from './logs';
import { env } from './env';


mongoose.Promise = Promise;
mongoose.connect(env.dbConnection)
  .then(() => console.log('mongo connected'))
  .then(() => initTgBot())
  .then(() => initServer())
  .then(() => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    logger.info('APP INIT SUCCESSFULLY');
    console.log('APP INIT SUCCESSFULLY');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
  })
  .catch((err) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    logger.error('APP INIT ERROR', err);
    console.log('APP INIT ERROR', err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
  });