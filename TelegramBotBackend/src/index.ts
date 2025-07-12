import mongoose from 'mongoose';
import { initTgBot } from './telegram';
import { initServer } from './server';

mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('connected', () => console.log('mongo connected'));
mongoose.connection.on('error', (err: Error) => console.log(err));

initTgBot();
initServer()