import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResultDate } from './models';
import { VoteDateConverter } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class ResultViewRequestService {
  private readonly baseUrl = 'results';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventResults(eventId: string): Observable<ResultDate[]> {
    const params = { eventId };
    return this.http.get<ResultDate[]>(this.baseUrl, { params }).pipe(
      map((dates) => dates.map((date) => VoteDateConverter.toJsDates(date)))
    );
  }
}
