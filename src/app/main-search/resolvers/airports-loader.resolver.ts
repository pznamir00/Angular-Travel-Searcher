import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AirportsHttpService } from '../services/airports-http.service';
import { AirportsService } from '../services/airports.service';
import { Airport } from '../types/airport.type';

@Injectable({
  providedIn: 'root',
})
export class AirportsLoaderResolver implements Resolve<Airport[]> {
  constructor(
    private _airportsService: AirportsService,
    private _airportsHttpService: AirportsHttpService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Airport[]> {
    return this._airportsHttpService
      .getAirportsList()
      .pipe(map(this._airportsService.csvStringToAirports));
  }
}
