import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbCalendarRange } from '@nebular/theme';
import { UntilDestroy } from '@ngneat/until-destroy';
import { pluck } from 'rxjs';
import { GeolocationHttpService } from './services/geolocation-http.service';
import { LatLon } from './types/geolocation.type';
import { MainSearchForm } from './types/main-search-form.type';
import { dateToSimpleFormat } from './utils/date.utils';
import { bothDatesRequired } from './validators/both-dates-required.validator';

@UntilDestroy()
@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  form: MainSearchForm;
  today = new Date();

  constructor(
    private _fb: FormBuilder,
    private _geolocationHttpService: GeolocationHttpService,
    private _router: Router,
  ) {
    this.form = this._fb.group({
      origin: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      range: new FormControl(50, [Validators.required]),
      dates: new FormControl<NbCalendarRange<Date> | null>(null, [
        bothDatesRequired,
      ]),
    });
  }

  ngOnInit() {
    this._loadUserGeolocation();
  }

  onDatesChange(dates: NbCalendarRange<Date>) {
    this.form.controls.dates.patchValue(dates);
  }

  onSubmit() {
    const dates = this.form.value.dates as NbCalendarRange<Date>;
    const range = this.form.value.range as number;
    const origCoords = this.form.controls.origin.metadata?.coords as LatLon;
    const destCoords = this.form.controls.destination.metadata
      ?.coords as LatLon;
    this._router.navigate(['results'], {
      queryParams: {
        startDate: dateToSimpleFormat(dates.start),
        endDate: dateToSimpleFormat(dates.end as Date),
        range,
        origLat: origCoords.latitude,
        origLon: origCoords.longitude,
        destLat: destCoords.latitude,
        destLon: destCoords.longitude,
      },
    });
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
}
