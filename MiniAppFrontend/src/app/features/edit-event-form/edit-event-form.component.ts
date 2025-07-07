import { Component, computed, inject } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonInput, IonModal, IonTextarea } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { EditEventFormLocalize } from './edit-event-form.localize';
import { LocalizeService } from 'src/app/shared/localize';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from 'src/app/core/services';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-event-form',
  templateUrl: './edit-event-form.component.html',
  styleUrls: ['./edit-event-form.component.scss'],
  imports: [
    SharedFeatureModule,
    IonInput,
    IonModal,
    IonDatetime,
    IonDatetimeButton,
    IonTextarea,
    ReactiveFormsModule,
  ],
})
export class EditEventFormComponent {

  private readonly startVal = format(new Date(), 'yyyy-MM-dd');
  private readonly endVal = format(addMonths(new Date(), 1), 'yyyy-MM-dd');

  public readonly eventFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    starts: new FormControl(this.startVal, Validators.required),
    ends: new FormControl(this.endVal, Validators.required),
    description: new FormControl(null),
  });

  private readonly startDate = toSignal(
    this.eventFormGroup.controls.starts.valueChanges,
    { initialValue: this.startVal }
  );

  private readonly endDate = toSignal(
    this.eventFormGroup.controls.ends.valueChanges,
    { initialValue: this.endVal }
  );

  public readonly isDatesInvalid = computed(() => {
    const startDate = new Date(this.startDate() as string);
    const endDate = new Date(this.endDate() as string);
    return startDate >= endDate;
  });

  private readonly localizeService = inject(LocalizeService);
  public readonly localizeFormat$ = this.localizeService.localizationWithFormat$;
  public readonly EditEventFormLocalize = EditEventFormLocalize;

  private readonly toast = inject(ToastService);

  constructor() { }

  public saveChanges(): void {
    console.log('save changes', this.eventFormGroup.value);
    this.localizeService.localize(EditEventFormLocalize.HasBeenSaved)
      .pipe(take(1))
      .subscribe((message) => this.toast.info(message, 'cloud-done-outline'));
  }
}
