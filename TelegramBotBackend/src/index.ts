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
  .then(() => logger.info('APP INIT SUCCESSFULLY'))
  .catch((err) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    logger.error('connection error with env', env);
    logger.error('APP INIT ERROR', env, err);
    console.log(err);
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
    console.log('!!!!!!!!!!!!!!!!!!!!!!');
  });