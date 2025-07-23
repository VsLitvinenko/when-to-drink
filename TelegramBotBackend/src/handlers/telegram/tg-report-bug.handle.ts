import { handleBotError, notifyAdminAboutReport } from '../../telegram';
import { createReport } from '../../database';
import { createLogChild } from '../../logs';
import { getTgLocalize, TelegramLocalize } from './telegram.localize';
import TelegramBot from 'node-telegram-bot-api';


const logger = createLogChild('telegram', 'ReportBug');

export const reportBugCommandHandle = async (bot: TelegramBot, chatId: number, user?: TelegramBot.User) => {
  const loc = getTgLocalize(user);
  const options: TelegramBot.SendMessageOptions = { reply_markup: { force_reply: true, selective: true } };
  const replyText = TelegramLocalize.ReportBugInit[loc];
  const msgToReply = await bot.sendMessage(chatId, replyText, options);
  // reply listener
  const listener = bot.onReplyToMessage(chatId, msgToReply.message_id, async (reply) => {
    try {
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
      const screenshot = reply.photo ? reply.photo[reply.photo.length - 1]?.file_id : undefined;
      const report = await createReport(user.id, chatId, replyText, screenshot);
      const successMessage = TelegramLocalize.ReportBugSuccess[loc].replace('{reportId}', String(report._id));
      await bot.sendMessage(chatId, successMessage, { reply_markup: { remove_keyboard: true } });
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