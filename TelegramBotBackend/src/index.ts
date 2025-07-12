import mongoose from 'mongoose';
import { initTgBot } from './telegram';
import { initServer } from './server';
import { env } from './env';

mongoose.Promise = Promise;
mongoose.connect(env.dbConnection);
mongoose.connection.on('connected', () => console.log('mongo connected'));
mongoose.connection.on('error', (err: Error) => console.log(err));

initTgBot();
initServer();