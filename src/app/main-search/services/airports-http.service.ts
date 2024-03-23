import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AirportsHttpService {
  constructor(private _http: HttpClient) {}

  getAirportsList() {
    return this._http.get(
      'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
      { responseType: 'text' },
    );
  }
}
