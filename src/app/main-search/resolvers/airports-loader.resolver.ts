import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { loadAirports } from 'src/app/store/airports/airports.actions';
import { selectAirports } from 'src/app/store/airports/airports.selector';
import { Airport } from '../../types/airport.type';

@Injectable({
  providedIn: 'root',
})
export class AirportsLoaderResolver implements Resolve<Airport[]> {
  constructor(private _store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Airport[]> {
    this._store.dispatch(loadAirports());
    return this._store
      .select(selectAirports)
      .pipe(filter((val) => !!val.length));
  }
}
