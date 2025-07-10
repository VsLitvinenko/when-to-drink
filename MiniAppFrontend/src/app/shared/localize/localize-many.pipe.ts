import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, inject, Injector, OnDestroy, Pipe, PipeTransform,  } from '@angular/core';
import { LocalizeService } from './localize.service';
import { LocalizationPresetLeaf } from './localize.model';

@Pipe({
  name: 'localizeMany',
  standalone: true,
})
export class LocalizeManyPipe implements PipeTransform, OnDestroy {

  private readonly localizeService = inject(LocalizeService);
  private readonly injector = inject(Injector);
  private readonly asyncPipe = new AsyncPipe(this.injector.get(ChangeDetectorRef));

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

  transform(value: LocalizationPresetLeaf, n?: number | null): string | null {
    return this.asyncPipe.transform(this.localizeService.localizeMany(value, n ?? 0));
  }
}