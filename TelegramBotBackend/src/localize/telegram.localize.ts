import { LocalizationPreset } from './localize.model';

enum LocalizeEnum {
  StartMessage = 'StartMessage',
  NoCreatedEvents = 'NoCreatedEvents',
  AmountOfCreated = 'AmountOfCreated',
  AmountOfVoted = 'AmountOfVoted',
  Error = 'Error',
}

export const TelegramLocalize: LocalizationPreset<LocalizeEnum> = {
  StartMessage: {
    en: 'Use this bot to choose dates, when you and your friends are ready for some events!',
    ru: 'Используйте этого бота, чтобы выбрать даты, когда вы и ваши друзья будете готовы к каким-либо мероприятиям!',
  },
  NoCreatedEvents: {
    en: 'You have not created any events yet',
    ru: 'Вы все еще не создали ни одного события',
  },
  AmountOfCreated: {
    en: 'Amount of created events',
    ru: 'Всего создано событий',
  },
  AmountOfVoted: {
    en: 'Amount of events you have voted',
    ru: 'Количество событий, в которых вы участвуете',
  },
  Error: {
    en: 'Something went wrong, unexpected error',
    ru: 'Что-то пошло не так, непредвиденная ошибка',
  },
};