import winston from 'winston';
import { env } from './env';

const { combine, timestamp, json, errors } = winston.format;
const f = env.logFolder();

export const logger = winston.createLogger({
  level: env.logLevel() ?? 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.File({ filename: `${f}/standard.log` })],
  exceptionHandlers: [new winston.transports.File({ filename: `${f}/exception.log` })],
  rejectionHandlers: [new winston.transports.File({ filename: `${f}/reject.log` })],
});

export const createLogChild = (type: string, val: string) => {
  return logger.child({ [type]: val });
};