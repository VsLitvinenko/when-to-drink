import { Injectable } from '@angular/core';
import { of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private readonly miniApp$ = of((window as any).Telegram.WebApp).pipe(shareReplay(1));

  constructor() { }

  public initApp(): void {
    this.miniApp$.subscribe((val) => console.log(val));
  }
}
