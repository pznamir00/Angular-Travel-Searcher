import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbCalendarRange } from '@nebular/theme';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, first, map, of, pluck, switchMap } from 'rxjs';
import { GeolocationHttpService } from './services/geolocation-http.service';
import { Airport } from './types/airport.type';
import {
  MainSearchForm,
  PlacesCoordsMetadata,
} from './types/main-search-form.type';
import { bothDatesRequired } from './validators/both-dates-required.validator';

@UntilDestroy()
@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchComponent implements OnInit {
  private _airports: Airport[] = [];
  private _placesCoordsMetadata: PlacesCoordsMetadata = {
    origin: null,
    destination: null,
  };
  form: MainSearchForm;
  today = new Date();

  constructor(
    private _fb: FormBuilder,
    private _geolocationHttpService: GeolocationHttpService,
    private _route: ActivatedRoute,
  ) {
    this.form = this._fb.group({
      origin: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      dates: new FormControl<NbCalendarRange<Date> | null>(null, [
        bothDatesRequired,
      ]),
    });
  }

  ngOnInit() {
    this._loadUserGeolocation();

    this._bindPlaceCoordsMetadataToFormControl('origin');
    this._bindPlaceCoordsMetadataToFormControl('destination');

    this._route.data.pipe(first()).subscribe((data) => {
      this._airports = data['airports'];
    });
  }

  onDatesChange(dates: NbCalendarRange<Date>) {
    this.form.controls.dates.patchValue(dates);
  }

  onSubmit() {
    const { value } = this.form;
    console.log(value);
  }

  private _loadUserGeolocation() {
    if ('navigator' in window) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this._geolocationHttpService
          .getAddressByCoordinates(position.coords)
          .pipe(pluck('display_name'))
          .subscribe((val) => this.form.controls.origin.patchValue(val));
      });
    }
  }

  private _bindPlaceCoordsMetadataToFormControl(
    placeKey: keyof PlacesCoordsMetadata,
  ) {
    this.form.controls[placeKey].valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(1000),
        switchMap((value) =>
          value
            ? this._geolocationHttpService.getCoordinatesByAddress(value)
            : of(null),
        ),
        map((value) =>
          value ? { latitude: +value[0].lat, longitude: +value[0].lon } : null,
        ),
      )
      .subscribe((result) => {
        this._placesCoordsMetadata[placeKey] = result;
      });
  }
}
