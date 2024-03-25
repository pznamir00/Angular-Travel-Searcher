import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ValidatorFn,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, debounceTime, map, of, switchMap } from 'rxjs';
import { GeolocationHttpService } from '../../services/geolocation-http.service';

@UntilDestroy()
@Component({
  selector: 'app-address-input',
  templateUrl: 'address-input.component.html',
  styleUrls: ['address-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {
  private _value$ = new BehaviorSubject('');

  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  constructor(
    @Self() private _control: NgControl,
    private _geolocationHttpService: GeolocationHttpService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._value$
      .pipe(
        untilDestroyed(this),
        debounceTime(1000),
        switchMap((value) =>
          value
            ? this._geolocationHttpService.getCoordinatesByAddress(value)
            : of(null),
        ),
        map((coords) =>
          coords?.[0]
            ? { latitude: +coords[0].lat, longitude: +coords[0].lon }
            : null,
        ),
      )
      .subscribe((coords) => {
        if (this._control.control) {
          this._control.control.metadata = { coords };
          this._control.control.updateValueAndValidity();
        }
      });

    this._control.valueAccessor = this;
  }

  ngOnInit() {
    this._control.control?.setValidators([
      this.validate.bind(this) as unknown as ValidatorFn,
    ]);
    this._control.control?.updateValueAndValidity();
  }

  get value() {
    return this._value$.value;
  }

  validate({ value }: FormControl) {
    const invalid = !value || !this._control.control?.metadata?.coords;
    return invalid && { invalid: true };
  }

  writeValue(value: string): void {
    this._value$.next(value);
    this._cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    this.writeValue(value);
    this.onChange(value);
    this.onTouch();
  }
}
