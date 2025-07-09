import { UserItem } from 'src/app/shared/components';
import { VoteType } from '../../vote-calendar/models';

export interface ResultUser extends UserItem {
  voteType: VoteType;
  start?: Date;
  end?: Date;
}
