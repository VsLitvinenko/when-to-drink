import { Component, computed, inject, OnInit } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonInput, IonModal, IonTextarea } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { EditEventFormLocalize } from './edit-event-form.localize';
import { LocalizeService } from 'src/app/shared/localize';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { combineLatest } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class EditEventFormComponent  implements OnInit {

  private readonly startOfMonth = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  private readonly endOfMonth = format(endOfMonth(new Date()), 'yyyy-MM-dd');

  public readonly eventFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    starts: new FormControl(this.startOfMonth, Validators.required),
    ends: new FormControl(this.endOfMonth, Validators.required),
    description: new FormControl(null),
  });

  private readonly startDate = toSignal(
    this.eventFormGroup.controls.starts.valueChanges,
    { initialValue: this.startOfMonth }
  );

  private readonly endDate = toSignal(
    this.eventFormGroup.controls.ends.valueChanges,
    { initialValue: this.endOfMonth }
  );

  public readonly isDatesInvalid = computed(() => {
    const startDate = new Date(this.startDate() as string);
    const endDate = new Date(this.endDate() as string);
    return startDate >= endDate;
  });

  private readonly localizeService = inject(LocalizeService);
  public readonly localizeFormat$ = this.localizeService.localizationWithFormat$;
  public readonly EditEventFormLocalize = EditEventFormLocalize;

  constructor() { }

  ngOnInit() {
  }

  public saveChanges(): void {
    console.log('save changes', this.eventFormGroup.value)
  }

}
