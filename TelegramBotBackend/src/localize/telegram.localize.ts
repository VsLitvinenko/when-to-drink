import { LocalizationPreset } from './localize.model';

enum LocalizeEnum {
  StartMessage = 'StartMessage',
  NoCreatedEvents = 'NoCreatedEvents',
  NoVotedEvents = 'NoVotedEvents',
  AmountOfCreated = 'AmountOfCreated',
  AmountOfVoted = 'AmountOfVoted',
  EventCreated = 'EventCreated',
  ShareWithFriends = 'ShareWithFriends',
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
  NoVotedEvents: {
    en: 'You have not voted in any events yet',
    ru: 'Вы все еще не поучаствовали ни в одном событии',
  },
  AmountOfCreated: {
    en: 'Amount of created events',
    ru: 'Всего создано событий',
  },
  AmountOfVoted: {
    en: 'Amount of events you have voted',
    ru: 'Количество событий, в которых вы участвуете',
  },
  EventCreated: {
    en: 'You have created a new event',
    ru: 'Вы создали новое событие',
  },
  ShareWithFriends: {
    en: 'Do not forget to share it with your friends!',
    ru: 'Не забудьте поделиться им с друзьями!'
  },
  Error: {
    en: 'Something went wrong, unexpected error',
    ru: 'Что-то пошло не так, непредвиденная ошибка',
  },
};