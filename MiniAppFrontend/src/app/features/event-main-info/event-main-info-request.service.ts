import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from 'src/app/shared/components';


export interface EventInfo {
  id: string;
  name: string;
  starts: Date;
  ends: Date;
  description?: string;
  users: UserItem[];
  creator: UserItem;
}

@Injectable({
  providedIn: 'root'
})
export class EventMainInfoRequestService {
  private readonly baseUrl = 'events';
  private readonly http = inject(HttpClient);

  constructor() { }

  public getEventInfo(eventId: string): Observable<EventInfo> {
    return this.http.get<EventInfo>(`${this.baseUrl}/${eventId}`);
  }
}
