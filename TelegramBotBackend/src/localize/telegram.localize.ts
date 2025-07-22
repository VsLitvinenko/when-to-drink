import TelegramBot from 'node-telegram-bot-api';
import { Localization, LocalizationPreset } from './localize.model';


export const getTgLocalize = (user: TelegramBot.User): Localization => {
  const loc = (user?.language_code ?? 'en') as Localization;
  return [Localization.en, Localization.ru].includes(loc) ? loc : Localization.en;
};


enum LocalizeEnum {
  StartMessage = 'StartMessage',
  NoCreatedEvents = 'NoCreatedEvents',
  NoVotedEvents = 'NoVotedEvents',
  AmountOfCreated = 'AmountOfCreated',
  AmountOfVoted = 'AmountOfVoted',
  EventCreated = 'EventCreated',
  ShareWithFriends = 'ShareWithFriends',
  ReportBugInit = 'ReportBugInit',
  ReportBugCancel = 'ReportBugCancel',
  ReportBugSuccess = 'ReportBugSuccess',
  ReportBugTimeout = 'ReportBugTimeout',
  Error = 'Error',
}

export const TelegramLocalize: LocalizationPreset<LocalizeEnum> = {
  StartMessage: {
    en: 'Use this bot to choose dates, when you and your friends are ready for some events!',
    ru: 'Используйте этого бота, чтобы выбрать даты, когда вы и ваши друзья будете готовы к каким-либо событиям!',
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
  ReportBugInit: {
    en: 'Please describe the issue you encountered. Optionally attach a screenshot as a photo (not a file).',
    ru: 'Пожалуйста, опишите проблему, с которой вы столкнулись. Опционально прикрепите скриншот как фото (не файл).',
  },
  ReportBugCancel: {
    en: 'Your message has no text, so the report has been canceled. If that was a mistake, please use command again.',
    ru: 'Ваше сообщение не содержит текста, поэтому отчет был отменен. Если это была ошибка, пожалуйста, используйте команду снова.',
  },
  ReportBugSuccess: {
    en: 'Your report has been created successfully. Report ID: {reportId}',
    ru: 'Ваш отчет успешно создан. ID отчета: {reportId}',
  },
  ReportBugTimeout: {
    en: 'You took too long to respond, the report has been canceled.',
    ru: 'Вы слишком долго не отвечали, отчет был отменен.',
  },
  Error: {
    en: 'Something went wrong, unexpected error',
    ru: 'Что-то пошло не так, непредвиденная ошибка',
  },
};