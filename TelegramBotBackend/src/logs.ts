import winston from 'winston';
const { combine, timestamp, json, errors } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.File({ filename: 'data/standard.log' })],
  exceptionHandlers: [new winston.transports.File({ filename: 'data/exception.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: 'data/reject.log' })],
});

export const createLogChild = (type: string, val: string) => {
  return logger.child({ [type]: val });
};