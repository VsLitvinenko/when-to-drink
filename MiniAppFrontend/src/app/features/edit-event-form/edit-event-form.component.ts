import { Component, computed, inject, input, OnDestroy, OnInit, Output } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonInput, IonModal, IonSpinner, IonTextarea, IonCheckbox, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { SharedFeatureModule } from 'src/app/shared';
import { EditEventFormLocalize } from './edit-event-form.localize';
import { LocalizeService } from 'src/app/shared/localize';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addMonths, format } from 'date-fns';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SmallToolsService, ToastService } from 'src/app/core/services';
import { combineLatest, filter, map, of, shareReplay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { EdiEventFormRequestService } from './edit-event-form-request.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
    IonSpinner,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export class EditEventFormComponent implements OnInit, OnDestroy {
  public readonly eventId = input<string | undefined>();

  private readonly startVal = format(new Date(), 'yyyy-MM-dd');
  private readonly endVal = format(addMonths(new Date(), 1), 'yyyy-MM-dd');

  public readonly eventFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    starts: new FormControl(this.startVal, Validators.required),
    ends: new FormControl(this.endVal, Validators.required),
    description: new FormControl(''),
    specifyDaysOfWeek: new FormControl(false),
    isoDaysOfWeek: new FormControl([] as number[]),
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

  private readonly local = inject(LocalizeService);
  public readonly localizeFormat$ = this.local.localizationWithFormat$;
  public readonly EditEventFormLocalize = EditEventFormLocalize;

  private readonly tools = inject(SmallToolsService);
  public readonly daysOfWeek = this.tools.daysOfWeek.map((date, i) => ({ date, value: i + 1, }));

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly toast = inject(ToastService);
  private readonly request = inject(EdiEventFormRequestService);
  public readonly loading$ = new Subject<boolean>();

  public readonly eventInfo$ = toObservable(this.eventId).pipe(
    tap(() => this.eventFormGroup.disable()),
    switchMap((eventId) => !!eventId ? this.request.getEventInfo(eventId) : of(null)),
    tap(() => this.eventFormGroup.enable()),
    shareReplay(1)
  );

  private readonly initFormValues = this.eventFormGroup.getRawValue(); 
  @Output() noUnsavedChanges = combineLatest([
    this.eventFormGroup.valueChanges,
    this.eventInfo$
  ]).pipe(
    map(([formValue, info]) => {
      const compareVal = info ?? this.initFormValues;
      return Object.entries(formValue).every(([key, value]) => {
        const infoValue = (compareVal as any)[key];
        return infoValue === value;
      });
    }),
    shareReplay(1)
  );

  private readonly destroyed$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.eventInfo$.pipe(
      filter((info) => info !== null),
      takeUntil(this.destroyed$)
    ).subscribe((info) => {
      this.eventFormGroup.patchValue({
        name: info.name,
        starts: info.starts,
        ends: info.ends,
        description: info.description,
        specifyDaysOfWeek: info.specifyDaysOfWeek,
        isoDaysOfWeek: info.isoDaysOfWeek ?? [],
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(void 0);
    this.destroyed$.complete();
  }

  public saveChanges(): void {
    const eventId = this.eventId();
    const formValue = this.eventFormGroup.getRawValue() as any;

    const request$ = eventId
      ? this.request.updateEvent(eventId, formValue)
      : this.request.createEvent(formValue);
    
    this.eventFormGroup.disable();
    request$.pipe(take(1)).subscribe((id) => {
      this.eventFormGroup.enable();
      const mes = this.local.localizeSync(EditEventFormLocalize.HasBeenSaved);
      this.toast.info(mes, 'cloud-done-outline')
      this.updateIdQueryParam(id)
    });
  }

  private updateIdQueryParam(eventId: string): void {
    const options: NavigationExtras = {
      queryParams: { eventId }, 
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], options);
  }
}
