import TelegramBot from 'node-telegram-bot-api';
import { createLogChild } from './logs';
import { InitData } from '@telegram-apps/init-data-node';
import { IEventDb, IReportDb } from './database';
import { env } from './env';
import {
  createdCommandHandle,
  getTgLocalize,
  reportBugCommandHandle,
  startCommandHandle,
  TelegramLocalize,
  updateReportCommandHandle,
  votedCommandHandle
} from './handlers/telegram';



/*-------------------------init bot-------------------------*/

const logger = createLogChild('telegram', 'bot');
const bot = new TelegramBot(env.tgToken(), { polling: true });

export const initTgBot = () => {
  bot.on('message', async (msg) => {
    try {
      const chatId = msg.chat.id;
      const text = msg.text;
      switch (text) {
        case '/start':
          await startCommandHandle(bot, chatId, msg.from);
          break;
        case '/created':
          await createdCommandHandle(bot, chatId, msg.from);
          break;
        case '/voted':
          await votedCommandHandle(bot, chatId, msg.from);
          break;
        case '/reportbug':
          await reportBugCommandHandle(bot, chatId, msg.from);
          break;
        case '/updatereport':
          await updateReportCommandHandle(bot, chatId, msg.from);
          break;
      }
    } catch (e) {
      await handleBotError(msg, e);
    }
  });
};

/*-------------------------helpers-------------------------*/

export const handleBotError = async (msg: TelegramBot.Message, e: any) => {
  const loc = getTgLocalize(msg.from);
  console.log('tg bot command error', msg, e);
  logger.error('tg bot command error', msg, e);
  await bot.sendMessage(msg.chat.id, TelegramLocalize.Error[loc]);
};

export const getBotUrl = async () => {
  const botInfo = await bot.getMe();
  return `https://t.me/${botInfo.username}`;
};

export const sendMessageOnCreateEvent = async (data: InitData, event: IEventDb) => {
  try {
    const botUrl = await getBotUrl();
    const loc = getTgLocalize(data.user as any);
    const options: TelegramBot.SendMessageOptions = { disable_web_page_preview: true };
    const eventLink = `${event.name} - ${botUrl}?startapp=event${event._id}`;
    const baseMessage = TelegramLocalize.EventCreated[loc];
    const shareMessage = TelegramLocalize.ShareWithFriends[loc];
    const message = `${baseMessage}:\n\n${eventLink}\n\n${shareMessage}`;
    await bot.sendMessage(data.user.id, message, options);
  } catch (e) {
    logger.warn(`Cannot send message to event ${event._id} creator`, data, event);
    console.log(`Cannot send message to event ${event._id} creator`);
    return;
  }
};

export const notifyAdminAboutReport = async (report: IReportDb) => {
  const adminId = env.tgAdminId();
  const message = `New bug report:\n\n` +
    `Report ID: ${report._id}\n` +
    `User ID: ${report.userTgId}\n` +
    `Chat ID: ${report.chatId}\n` +
    `Description: ${report.description}\n` +
    `Created At: ${report.createdAt.toISOString()}\n` +
    `Status: ${report.status}`;
  if (report.screenshot) {
    await bot.sendPhoto(adminId, report.screenshot, { caption: message });
  } else {
    await bot.sendMessage(adminId, message);
  }
};

export const notifyUserAboutReportStatus = async (report: IReportDb) => {
  const message = `Your bug report has been updated:\n\n` +
    `Report ID: ${report._id}\n` +
    `Status: ${report.status}\n` +
    `Developer notes: ${report.developerNotes ?? 'No developer notes provided'}\n`;
  try {
    await bot.sendMessage(report.userTgId, message);
    console.log('User notified about report status', report._id);
    logger.info('User notified about report status', report._id);
  } catch (e) {
    console.error('Failed to notify user about report status', report._id, e);
    logger.error('Failed to notify user about report status', report._id, e);
  }
};
