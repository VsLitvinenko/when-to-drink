import dotenv from 'dotenv';

dotenv.config();

export const env = {
  logLevel: () => process.env.LOG_LEVEL?.toLowerCase(),
  logFolder: () => process.env.LOG_FOLDER,
  port: () => Number(process.env.PORT),
  production: () => process.env.PRODUCTION === 'true',
  webAppUrl: () => process.env.WEB_APP_URL,
  tgToken: () => process.env.TELEGRAM_TOKEN,
  tgAdminId: () => Number(process.env.TELEGRAM_ADMIN_ID),
  tgTokenExpiresIn: () => Number(process.env.TELEGRAM_TOKEN_EXPIRES_IN),
  dbConnection: () => process.env.DATABASE_URL,
};