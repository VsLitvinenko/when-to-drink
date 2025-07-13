import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResultInfo } from './models';
import { VoteDateConverter } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class ResultViewRequestService {
  private readonly baseUrl = 'results';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventResults(eventId: string): Observable<ResultInfo> {
    const params = { eventId };
    return this.http.get<ResultInfo>(this.baseUrl, { params }).pipe(
      map((info) => {
        const dates = info.dates.map((d) => VoteDateConverter.toJsDates(d));
        return { ...info, dates };
      })
    );
  }
}
