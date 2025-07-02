import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, inject, Injector, OnDestroy, Pipe, PipeTransform,  } from '@angular/core';
import { LocalizeService } from './localize.service';
import { LocalizationPresetLeaf } from './localize.model';

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

  transform(value: LocalizationPresetLeaf): string | null {
    return this.asyncPipe.transform(this.localizeService.localize(value));
  }
}