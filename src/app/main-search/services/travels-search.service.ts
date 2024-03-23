import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbCalendarRange } from '@nebular/theme';
import { first } from 'rxjs';
import { Airport } from '../../types/airport.type';
import { PlacesCoordsMetadata } from '../types/main-search-form.type';

@Injectable({
  providedIn: 'root',
})
export class TravelsSearchService {
  private _airports: Airport[] = [];

  constructor(private _route: ActivatedRoute) {
    this._route.data.pipe(first()).subscribe((data) => {
      this._airports = data['airports'];
    });
  }

  searchTravels(
    originAndDest: PlacesCoordsMetadata,
    dates: NbCalendarRange<Date>,
  ) {
    //
  }
}
