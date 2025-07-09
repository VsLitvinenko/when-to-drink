import { ResultDate } from 'src/app/features/result-view';
import { VoteType } from 'src/app/features/vote-calendar/models';
import { fakeUsers } from './fake-users';

export const fakeDates: ResultDate[] = [
  {
    date: new Date(2025, 6, 7),
    voteType: VoteType.Ready,
    users: [
      fakeUsers[0],
      fakeUsers[2],
      fakeUsers[3],
    ],
  },
  {
    date: new Date(2025, 6, 8),
    voteType: VoteType.Ready,
    users: [
      fakeUsers[0],
      fakeUsers[2],
    ],
  },
  {
    date: new Date(2025, 6, 10),
    start: new Date(2025, 6, 10, 18, 30),
    end: new Date(2025, 6, 10, 22, 0),
    voteType: VoteType.Time,
    users: [
      fakeUsers[0],
      fakeUsers[1],
      fakeUsers[2],
      fakeUsers[3],
    ],
  },
  {
    date: new Date(2025, 6, 13),
    start: new Date(2025, 6, 10, 18, 30),
    end: new Date(2025, 6, 10, 22, 0),
    voteType: VoteType.Maybe,
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
    date: new Date(2025, 6, 14),
    voteType: VoteType.Ready,
    users: [
      fakeUsers[0],
    ],
  },
  {
    date: new Date(2025, 6, 15),
    voteType: VoteType.Maybe,
    users: [
      fakeUsers[0],
      fakeUsers[2],
      fakeUsers[3],
      fakeUsers[4],
      fakeUsers[5],
    ],
  },
];
