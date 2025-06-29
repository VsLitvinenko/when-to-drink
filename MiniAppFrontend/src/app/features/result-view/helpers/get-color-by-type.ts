import { VoteType } from '../../vote-calendar/models';

export const getColorByType = (type: VoteType): string => {
  switch (type) {
    case VoteType.Ready:
      return 'primary';
    case VoteType.Maybe:
      return 'warning';
    case VoteType.Time:
      return 'success';
  }
};
