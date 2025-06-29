import { ResultDate } from 'src/app/features/result-view';
import { VoteType } from 'src/app/features/vote-calendar/models';
import { fakeUsers } from './fake-users';

export const fakeDates: ResultDate[] = [
  {
    date: new Date(2025, 5, 7),
    type: VoteType.Ready,
    users: [
      fakeUsers[0],
      fakeUsers[2],
      fakeUsers[3],
    ],
  },
  {
    date: new Date(2025, 5, 8),
    type: VoteType.Ready,
    users: [
      fakeUsers[0],
      fakeUsers[2],
    ],
  },
  {
    date: new Date(2025, 5, 10),
    type: VoteType.Time,
    users: [
      fakeUsers[0],
      fakeUsers[1],
      fakeUsers[2],
      fakeUsers[3],
    ],
  },
  {
    date: new Date(2025, 5, 13),
    type: VoteType.Maybe,
    users: [
      fakeUsers[0],
      fakeUsers[1],
      fakeUsers[2],
      fakeUsers[3],
      fakeUsers[4],
      fakeUsers[5],
    ],
  },
  {
    date: new Date(2025, 5, 14),
    type: VoteType.Ready,
    users: [
      fakeUsers[0],
    ],
  },
  {
    date: new Date(2025, 5, 15),
    type: VoteType.Maybe,
    users: [
      fakeUsers[0],
      fakeUsers[2],
      fakeUsers[3],
      fakeUsers[4],
      fakeUsers[5],
    ],
  },
];
