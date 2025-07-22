import { env } from '../../env';
import { updateReportById } from '../../database';
import { notifyUserAboutReportStatus } from '../../telegram';
import TelegramBot from 'node-telegram-bot-api';


export const updateReportCommandHandle = async (bot: TelegramBot, chatId: number, user?: TelegramBot.User) => {
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
};
