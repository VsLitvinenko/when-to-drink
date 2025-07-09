import { VoteType } from '../../vote-calendar/models';

export class ResultViewHelpers {
  
  public static getColorByType(voteType: VoteType): string {
    switch (voteType) {
      case VoteType.Ready:
        return 'primary';
      case VoteType.Maybe:
        return 'warning';
      case VoteType.Time:
        return 'success';
    }
  }

  public static getIconByType(voteType: VoteType): string {
    switch (voteType) {
      case VoteType.Ready:
        return 'checkmark-outline';
      case VoteType.Maybe:
        return 'help-outline';
      case VoteType.Time:
        return 'time-outline';
    }
  }
}
