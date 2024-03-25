import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, combineLatest, map, mergeMap } from 'rxjs';
import { FlightsHttpService } from '../../results/services/flights-http.service';
import { loadAirports, loadAirportsSuccess } from './airports.actions';

@Injectable()
export class AirportsEffects {
  constructor(
    private _actions$: Actions,
    private _flightsHttpService: FlightsHttpService,
  ) {}

  loadAirports$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadAirports),
      mergeMap(({ origin, destination, range }) => {
        return combineLatest([
          this._flightsHttpService.getAirportsList(
            origin.latitude,
            origin.longitude,
            range,
          ),
          this._flightsHttpService.getAirportsList(
            destination.latitude,
            destination.longitude,
            range,
          ),
        ]).pipe(
          map(([originRes, destinationRes]) =>
            loadAirportsSuccess({
              airports: {
                origin: originRes.data,
                destination: destinationRes.data,
              },
            }),
          ),
          catchError(() => EMPTY),
        );
      }),
    );
  });
}
