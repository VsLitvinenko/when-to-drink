import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoteDate } from './models';

@Injectable({
  providedIn: 'root'
})
export class VoteCalendarRequestService {
  private readonly baseUrl = 'votes';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventVote(eventId: string): Observable<VoteDate[]> {
    return this.http.get<any>(this.baseUrl, { params: { eventId } }).pipe(
      map((res) => res.dates as VoteDate[]),
      map((dates) => dates.map((item) => ({
        ...item,
        date: new Date(item.date),
        start: item.start ? new Date(item.start) : undefined,
        end: item.end ? new Date(item.end) : undefined,
      })))
    );
  }
}
