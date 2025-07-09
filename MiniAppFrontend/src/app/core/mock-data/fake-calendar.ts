import { format } from 'date-fns';
import { VoteDate, VoteType } from 'src/app/features/vote-calendar/models';

function generateRandomVoteDates(): VoteDate[] {
  const voteTypes = [VoteType.Ready, VoteType.Maybe, VoteType.Time];
  const results = new Map<string, VoteDate>();

  for (let i = 0; i < 10; i++) {
    const day = Math.floor(Math.random() * 31) + 1; // July has 31 days
    const voteType = voteTypes[Math.floor(Math.random() * voteTypes.length)];
    const date = new Date(2025, 6, day); // Month is 0-based, so 6 = July
    let start: Date | undefined;
    let end: Date | undefined;
    if (voteType === VoteType.Time) {
      // Random time between 8:00 and 20:00
      const startHour = 8 + Math.floor(Math.random() * 12);
      start = new Date(date);
      start.setHours(startHour, 0, 0, 0);
      end = new Date(start);
      end.setHours(startHour + 2); // 2 hour window
    }
    const key = format(date, 'yyyy-MM-dd');
    results.set(key, { date, voteType, start, end });
  }
  return Array.from(results.values());
}

export const fakeCalendar = generateRandomVoteDates();