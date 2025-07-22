import { getEventsByCreator, isTgUserExist } from '../../database';
import { getTgLocalize, TelegramLocalize } from './telegram.localize';
import { getBotUrl } from '../../telegram';
import TelegramBot from 'node-telegram-bot-api';


export const createdCommandHandle = async (bot: TelegramBot, chatId: number, user?: TelegramBot.User) => {
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
};
