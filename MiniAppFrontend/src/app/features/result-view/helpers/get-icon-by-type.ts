import { VoteType } from '../../vote-calendar/models';

export const getIconByType = (type: VoteType): string => {
  switch (type) {
    case VoteType.Ready:
      return 'checkmark-outline';
    case VoteType.Maybe:
      return 'help-outline';
    case VoteType.Time:
      return 'time-outline';
  }
};
