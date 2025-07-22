import { getVotesByUser, isTgUserExist } from '../../database';
import { getBotUrl } from '../../telegram';
import { getTgLocalize, TelegramLocalize } from './telegram.localize';
import TelegramBot from 'node-telegram-bot-api';


export const votedCommandHandle = async (bot: TelegramBot, chatId: number, user?: TelegramBot.User) => {
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
