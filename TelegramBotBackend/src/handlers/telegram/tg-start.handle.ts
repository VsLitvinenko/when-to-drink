import { getTgLocalize, TelegramLocalize } from './telegram.localize';
import { env } from '../../env';
import TelegramBot from 'node-telegram-bot-api';


export const startCommandHandle = async (bot: TelegramBot, chatId: number, user?: TelegramBot.User) => {
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
