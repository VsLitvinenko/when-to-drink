import { Localization, TelegramLocalize } from './localize';
import { getEventsByCreator, getUserByTgId, getVotesByUser, IEventDb } from './database';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(
  process.env.TELEGRAM_TOKEN,
  { polling: true }
);

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
      }
    } catch (e) {
      const loc = (msg.from?.language_code ?? 'en') as Localization;
      await bot.sendMessage(msg.chat.id, TelegramLocalize.Error[loc]);
    }
  });
};

export const getBotUrl = async () => {
  const botInfo = await bot.getMe();
  return `https://t.me/${botInfo.username}`;
}

const startCommand = async (chatId: number, user?: TelegramBot.User) => {
  const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Create New Event',
          web_app: { url: process.env.WEB_APP_URL },
        }],
      ],
    },
  };
  const loc = (user?.language_code ?? 'en') as Localization;
  const message = TelegramLocalize.StartMessage[loc];
  await bot.sendMessage(chatId, message, options);
}

const createdCommand = async(chatId: number, user?: TelegramBot.User) => {
  if (!user) { return; }
  const loc = (user?.language_code ?? 'en') as Localization;
  const botUrl = await getBotUrl();
  const dbUser = await getUserByTgId(user.id);
  const events = await getEventsByCreator(dbUser._id);
  if (!events || events.length === 0) {
    bot.sendMessage(chatId, TelegramLocalize.NoCreatedEvents[loc]);
    return;
  }
  const options: TelegramBot.SendMessageOptions = { disable_web_page_preview: true };
  const eventLinks = events.map((e) => `${e.name} - ${botUrl}?startapp=event${e._id}`);
  const baseMessage = `${TelegramLocalize.AmountOfCreated[loc]} - ${events.length}:`;
  const message = `${baseMessage}\n\n${eventLinks.join('\n\n')}`;
  await bot.sendMessage(chatId, message, options);
}

const votedCommand = async(chatId: number, user?: TelegramBot.User) => {
  if (!user) { return; }
  const loc = (user?.language_code ?? 'en') as Localization;
  const botUrl = await getBotUrl();
  const dbUser = await getUserByTgId(user.id);
  const votes = await getVotesByUser(dbUser).populate<{ event: IEventDb }>('event');
  const options: TelegramBot.SendMessageOptions = { disable_web_page_preview: true };
  const eventLinks = votes.map((v) => `${v.event.name} - ${botUrl}?startapp=event${v.event._id}`);
  const baseMessage = `${TelegramLocalize.AmountOfVoted[loc]} - ${votes.length}:`;
  const message = `${baseMessage}\n\n${eventLinks.join('\n\n')}`;
  await bot.sendMessage(chatId, message, options);
}