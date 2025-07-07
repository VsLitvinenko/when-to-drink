import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import appSecrets from '../.appsecrets.json';

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080);

mongoose.Promise = Promise;
mongoose.connect(appSecrets.dbConnection);
mongoose.connection.on('error', (err: Error) => console.log(err));