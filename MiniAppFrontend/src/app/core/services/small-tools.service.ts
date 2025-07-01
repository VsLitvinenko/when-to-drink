import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmallToolsService {

  public readonly isTouchDevice: Boolean =
    matchMedia('(pointer: coarse)').matches ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);
    
}
