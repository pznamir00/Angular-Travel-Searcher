import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AirportsHttpService extends ApiService {
  getAirportsList() {
    return this.http.get(
      'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
      { responseType: 'text' },
    );
  }
}
