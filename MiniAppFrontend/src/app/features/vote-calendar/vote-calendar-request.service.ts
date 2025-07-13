import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoteDate } from './models';
import { VoteDateConverter } from 'src/app/shared/helpers';


export interface EventVote {
  alreadyVoted: boolean;
  dates: VoteDate[];
}

@Injectable({
  providedIn: 'root'
})
export class VoteCalendarRequestService {
  private readonly baseUrl = 'votes';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventVote(eventId: string): Observable<EventVote> {
    const params = { eventId };
    return this.http.get<EventVote>(this.baseUrl, { params }).pipe(
      map((res) => {
        const dates = res.dates.map((date) => VoteDateConverter.toJsDates(date));
        return { ...res, dates };
      })
    );
  }

  public updateEventVote(eventId: string, dates: VoteDate[]): Observable<EventVote> {
    const converted = dates.map((d) => VoteDateConverter.toStringDates(d));
    const body = { dates: converted };
    const params = { eventId };
    return this.http.post<EventVote>(this.baseUrl, body, { params }).pipe(
      map((res) => {
        const dates = res.dates.map((date) => VoteDateConverter.toJsDates(date));
        return { ...res, dates };
      })
    );
  }
}
