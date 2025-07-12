import dotenv from 'dotenv';

dotenv.config();

export const env = {
  production: process.env.PRODUCTION === 'true',
  webAppUrl: process.env.WEB_APP_URL,
  tgToken: process.env.TELEGRAM_TOKEN,
  tgTokenExpiresIn: Number(process.env.TELEGRAM_TOKEN_EXPIRES_IN),
  dbConnection: process.env.DATABASE_URL,
};