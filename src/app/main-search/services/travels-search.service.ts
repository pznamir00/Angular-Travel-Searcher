import { Injectable } from '@angular/core';
import { NbCalendarRange } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { getDistance } from 'geolib';
import { selectAirports } from 'src/app/store/airports/airports.selector';
import { Airport } from '../../types/airport.type';
import { LatLon } from '../types/geolocation.type';
import { PlacesCoordsMetadata } from '../types/main-search-form.type';
import { dateToSimpleFormat } from '../utils/date.utils';
import { FlightsHttpService } from './flights-http.service';

@Injectable({
  providedIn: 'root',
})
export class TravelsSearchService {
  private _airports: Airport[] = [];

  constructor(
    private _store: Store,
    private _flightsHttpService: FlightsHttpService,
  ) {
    this._store.select(selectAirports).subscribe((airports) => {
      this._airports = airports;
    });
  }

  searchTravels(
    originAndDest: PlacesCoordsMetadata,
    dates: NbCalendarRange<Date>,
    range: number,
  ) {
    const orig = originAndDest.origin as LatLon;
    const dest = originAndDest.destination as LatLon;
    const origAirports = this._getAirportsWithinRange(range, orig);
    const destAirports = this._getAirportsWithinRange(range, dest);

    if (!origAirports.length || !destAirports.length) {
      throw new Error();
    }

    const origin = origAirports[1];
    const destination = destAirports[1];

    this._flightsHttpService
      .getFlights(
        origin.iata,
        destination.iata,
        dateToSimpleFormat(dates.start),
        dateToSimpleFormat(dates.end as Date),
      )
      .subscribe(console.log);
  }

  private _getAirportsWithinRange(range: number, latLon: LatLon) {
    const origin = {
      lat: latLon.latitude,
      lon: latLon.longitude,
    };
    return this._airports.filter((airport) => {
      const dist =
        getDistance({ lat: airport.latitude, lon: airport.longitude }, origin) /
        1000;
      return dist <= range;
    });
  }
}
