import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, inject, Injector, OnDestroy, Pipe, PipeTransform,  } from '@angular/core';
import { LocalizeService } from './localize.service';
import { isLocalizationLeaf } from './localize.model';

@Pipe({
  name: 'localize',
  standalone: true,
})
export class LocalizePipe implements PipeTransform, OnDestroy {

  private readonly localizeService = inject(LocalizeService);
  private readonly injector = inject(Injector);
  private readonly asyncPipe = new AsyncPipe(this.injector.get(ChangeDetectorRef));

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

  transform(value: any): string | null {
    if (isLocalizationLeaf(value)) {
      return this.asyncPipe.transform(this.localizeService.localize(value));
    } else {
      console.error('LocalizePipe not correct localization value');
      return null;
    }
  }
}