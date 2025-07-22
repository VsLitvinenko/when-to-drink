import { env } from './env';
import { createLogChild } from './logs';
import { InitData } from '@telegram-apps/init-data-node';
import { getTgLocalize, TelegramLocalize } from './localize';
import { createReport, getEventsByCreator, getVotesByUser, IEventDb, IReportDb, isTgUserExist, updateReportById } from './database';
import TelegramBot from 'node-telegram-bot-api';


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
          await startCommand(chatId, msg.from);
          break;
        case '/created':
          await createdCommand(chatId, msg.from);
          break;
        case '/voted':
          await votedCommand(chatId, msg.from);
          break;
        case '/reportbug':
          await reportBugCommand(chatId, msg.from);
          break;
        case '/updatebugreport':
          await updateBugReportCommand(chatId, msg.from);
          break;
      }
    } catch (e) {
      await handleBotError(msg, e);
    }
  });
};

/*-------------------------helpers-------------------------*/

const handleBotError = async (msg: TelegramBot.Message, e: any) => {
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

/*-------------------------commands-------------------------*/

const startCommand = async (chatId: number, user?: TelegramBot.User) => {
  const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Create New Event',
          web_app: { url: env.webAppUrl() },
        }],
      ],
    },
  };
  const loc = getTgLocalize(user);
  const message = TelegramLocalize.StartMessage[loc];
  await bot.sendMessage(chatId, message, options);
};


const createdCommand = async (chatId: number, user?: TelegramBot.User) => {
  if (!user) { return; }
  const loc = getTgLocalize(user);
  const botUrl = await getBotUrl();
  const dbUser = await isTgUserExist(user.id);
  const events = !dbUser ? [] : await getEventsByCreator(dbUser).select<{ name: string }>('name');
  if (!events || events.length === 0) {
    bot.sendMessage(chatId, TelegramLocalize.NoCreatedEvents[loc]);
    return;
  }
  const options: TelegramBot.SendMessageOptions = { disable_web_page_preview: true };
  const eventLinks = events.map((e) => `${e.name} - ${botUrl}?startapp=event${e._id}`);
  const baseMessage = `${TelegramLocalize.AmountOfCreated[loc]} - ${events.length}`;
  const message = `${baseMessage}:\n\n${eventLinks.join('\n\n')}`;
  await bot.sendMessage(chatId, message, options);
}


const votedCommand = async (chatId: number, user?: TelegramBot.User) => {
  if (!user) { return; }
  const loc = getTgLocalize(user);
  const botUrl = await getBotUrl();
  const dbUser = await isTgUserExist(user.id);
  const votes = !dbUser ? [] : await getVotesByUser(dbUser)
    .select<{ event: any }>('event')
    .populate<{ event: { _id: any; name: string; } }>('event', 'name');
    
  if (!votes || votes.length === 0) {
    bot.sendMessage(chatId, TelegramLocalize.NoVotedEvents[loc]);
    return;
  }
  const options: TelegramBot.SendMessageOptions = { disable_web_page_preview: true };
  const eventLinks = votes.map((v) => `${v.event.name} - ${botUrl}?startapp=event${v.event._id}`);
  const baseMessage = `${TelegramLocalize.AmountOfVoted[loc]} - ${votes.length}`;
  const message = `${baseMessage}:\n\n${eventLinks.join('\n\n')}`;
  await bot.sendMessage(chatId, message, options);
};


const reportBugCommand = async (chatId: number, user?: TelegramBot.User) => {
  const loc = getTgLocalize(user);
  const options: TelegramBot.SendMessageOptions = { reply_markup: { force_reply: true, selective: true } };
  const replyText = TelegramLocalize.ReportBugInit[loc];
  const msgToReply = await bot.sendMessage(chatId, replyText, options);
  // reply listener
  const listener = bot.onReplyToMessage(chatId, msgToReply.message_id, async (reply) => {
    clearTimeout(timeout);
    bot.removeReplyListener(listener);
    const replyText = reply.text ?? reply.caption;
    if (!replyText) {
      const cancelText = TelegramLocalize.ReportBugCancel[loc];
      await bot.sendMessage(chatId, cancelText);
      console.log('Report bug command: no text in reply', reply);
      logger.info('Report bug command: no text in reply', reply);
      return;
    }
    try {
      const screenshot = reply.photo ? reply.photo[reply.photo.length - 1]?.file_id : undefined;
      const report = await createReport(user.id, chatId, replyText, screenshot);
      const successMessage = TelegramLocalize.ReportBugSuccess[loc].replace('{reportId}', String(report._id));
      await bot.sendMessage(chatId, successMessage);
      await notifyAdminAboutReport(report);
      console.log('Report created successfully', report);
      logger.info('Report created successfully', report);
    } catch (e) {
      await handleBotError(reply, e);
    }
  });
  // remove listener after 5 minutes
  const timeout = setTimeout(() => {
    bot.removeReplyListener(listener);
    bot.sendMessage(chatId, TelegramLocalize.ReportBugTimeout[loc]);
    console.log('Report bug command: timeout', chatId, user);
    logger.info('Report bug command: timeout', chatId, user);
  }, 1000 * 60 * 5);
};


const updateBugReportCommand = async (chatId: number, user?: TelegramBot.User) => {
  if (user.id !== env.tgAdminId()) { return; }
  const msgText = '*reportId*\n*status*\n*developerNotes*';
  const options: TelegramBot.SendMessageOptions = { reply_markup: { force_reply: true, selective: true } };
  const msgToReply = await bot.sendMessage(chatId, msgText, options);
  // reply listener
  const listener = bot.onReplyToMessage(chatId, msgToReply.message_id, async (reply) => {
    clearTimeout(timeout);
    bot.removeReplyListener(listener);
    const [reportId, status, developerNotes] = reply.text.split('\n');
    const updated = await updateReportById(reportId, { status: status as any, developerNotes });
    await notifyUserAboutReportStatus(updated);
    bot.sendMessage(chatId, `Report ${reportId} updated successfully.`);
  });
  // remove listener after 5 minutes
  const timeout = setTimeout(() => bot.removeReplyListener(listener), 1000 * 60 * 5);
}