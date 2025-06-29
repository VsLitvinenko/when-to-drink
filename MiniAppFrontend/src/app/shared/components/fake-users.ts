import { VoteType } from 'src/app/features/vote-calendar/models';
import { UserItem } from './users-list/users-list.component';

export const fakeUsers: UserItem[] = [
  {
    imgSrc:
      'https://sun9-70.userapi.com/s/v1/ig1/6TXRo0SjdKeh-P-doF7uu2odkqlfbLP3oi7I1PMZE8L5qXpFD-rwjnL8ZgtdjKtvSoxm9Q.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x479,540x539,640x639,720x719,939x938&from=bu&cs=939x0',
    fullName: 'Vyacheslav Litvinenko',
    type: VoteType.Ready,
  },
  {
    imgSrc:
      'https://sun9-55.userapi.com/s/v1/ig1/JImYYh7ZEphKqDhC9ATO3KOxR9_gWzoLeDiU-xxYoMxYLVMJF8mQMb1ZM7bOR92-yfHTBw.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1200x1200&from=bu&cs=1200x0',
    fullName: 'Alexander Lyakishev',
    type: VoteType.Time,
  },
  {
    imgSrc:
      'https://sun9-57.userapi.com/s/v1/ig1/SxXmIXDiVvIovyFZ0PCvMV1uFETFOC_-xbs74in112Tetqi7Jx-1nFY91CpBYJshpG61-g.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,1600x1600&from=bu&cs=1600x0',
    fullName: 'Anton Larionov',
    type: VoteType.Ready,
  },
  {
    imgSrc:
      'https://sun9-82.userapi.com/s/v1/ig1/dmezIsgNc0K_DBXp-dAaiPDjd_KMapNx06nFtxrJIN7h8JN9dIJBMF_meWvNCQ2AUAblqw.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2160x2160&from=bu&cs=2160x0',
    fullName: 'Ilvir Kharisov',
    type: VoteType.Ready,
  },
  {
    imgSrc:
      'https://sun9-43.userapi.com/s/v1/ig1/yTQDt0coIwzOF2nDEulNDof6xL47m5SU4ovaAJ0TPxXtZnTzxTH1Aai4fKy1WhAPd_LMhQ.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,1800x1800&from=bu&cs=1800x0',
    fullName: 'Sonya Korotkova',
    type: VoteType.Maybe,
  },
  {
    imgSrc:
      'https://sun9-56.userapi.com/s/v1/ig1/6_cbRLj-LvrTW0M9dLXUlK0d-vz06Ija_egxSPve4TnbJCPygeGbGNQZ8qQ46hnsi3EH7jcT.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1300x1300&from=bu&cs=1300x0',
    fullName: 'Zamir Ramaznov',
    type: VoteType.Maybe,
  },
];

export const avatars = fakeUsers.map((user) => user.imgSrc);
