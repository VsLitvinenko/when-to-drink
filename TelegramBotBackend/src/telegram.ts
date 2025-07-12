import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(
  process.env.TELEGRAM_TOKEN,
  { polling: true }
);

export const initTgBot = () => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    switch (text) {
      case '/start':
        const startMsg = 'Use this bot to choose dates, when you and your friends are ready for some events!';
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
        await bot.sendMessage(chatId, startMsg, options);
        break;
    }
  });
};
