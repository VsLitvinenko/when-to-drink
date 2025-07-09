import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoteDate } from './models';
import { VoteDateConverter } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class VoteCalendarRequestService {
  private readonly baseUrl = 'votes';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventVote(eventId: string): Observable<VoteDate[]> {
    const params = { eventId };
    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res) => res.dates as VoteDate[]),
      map((dates) => dates.map((date) => VoteDateConverter.toJsDates(date)))
    );
  }

  public updateEventVote(eventId: string, dates: VoteDate[]): Observable<VoteDate[]> {
    const converted = dates.map((d) => VoteDateConverter.toStringDates(d));
    const body = { dates: converted };
    const params = { eventId };
    return this.http.post<any>(this.baseUrl, body, { params }).pipe(
      map((res) => res.dates as VoteDate[]),
      map((dates) => dates.map((date) => VoteDateConverter.toJsDates(date)))
    );
  }
}
