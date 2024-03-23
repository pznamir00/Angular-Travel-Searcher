import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, first, map, of, switchMap } from 'rxjs';
import { GeolocationHttpService } from './services/geolocation-http.service';
import { Airport } from './types/airport.type';
import {
  MainSearchForm,
  PlacesCoordsMetadata,
} from './types/main-search-form.type';

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

  constructor(
    private _fb: FormBuilder,
    private _geolocationHttpService: GeolocationHttpService,
    private _route: ActivatedRoute,
  ) {
    this.form = this._fb.group({
      origin: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      date: {
        from: new FormControl(new Date(), [Validators.required]),
        to: new FormControl(new Date(), [Validators.required]),
      },
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

  private _loadUserGeolocation() {
    if ('navigator' in window) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this._geolocationHttpService
          .getAddressByCoordinates(position.coords)
          .subscribe((result) => {
            this.form.controls.origin.patchValue(result.display_name);
          });
      });
    }
  }

  private _bindPlaceCoordsMetadataToFormControl(
    placeKey: keyof PlacesCoordsMetadata,
  ) {
    this.form.controls[placeKey].valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
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
