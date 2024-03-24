import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, skip } from 'rxjs';
import { loadAirports } from 'src/app/store/airports/airports.actions';
import { selectAirports } from 'src/app/store/airports/airports.selector';
import { AirportsByPoint } from '../types/airports-by-point.type';

@Injectable({
  providedIn: 'root',
})
export class AirportsLoaderResolver implements Resolve<AirportsByPoint> {
  constructor(private _store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<AirportsByPoint> {
    const { range, origLat, origLon, destLat, destLon } = route.queryParams;
    this._store.dispatch(
      loadAirports({
        origin: { latitude: origLat, longitude: origLon },
        destination: { latitude: destLat, longitude: destLon },
        range,
      }),
    );
    return this._store.select(selectAirports).pipe(skip(1));
  }
}
