import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  EMPTY,
  catchError,
  concatMap,
  delay,
  from,
  map,
  mergeMap,
  tap,
  toArray,
} from 'rxjs';
import deepcopy from 'ts-deepcopy';
import { v4 as uuidv4 } from 'uuid';
import { FlightsHttpService } from '../../results/services/flights-http.service';
import {
  addFlights,
  loadAllFlights,
  loadFlightsSuccess,
} from './flights.action';

@Injectable()
export class FlightsEffects {
  constructor(
    private _actions$: Actions,
    private _flightsHttpService: FlightsHttpService,
    private _store: Store,
  ) {}

  loadAllFlights$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadAllFlights),
      mergeMap(({ startDate, endDate, combinations }) => {
        return from(combinations).pipe(
          concatMap((airportsByPoint) => {
            return this._flightsHttpService
              .getFlightsList(
                airportsByPoint.origin.iataCode,
                airportsByPoint.destination.iataCode,
                startDate,
                endDate,
              )
              .pipe(
                map((result) => deepcopy(result)),
                tap((result) => {
                  const flights = result.data.map((flight) => ({
                    ...flight,
                    key: uuidv4(),
                  }));
                  this._store.dispatch(addFlights({ flights }));
                }),
                delay(500),
              );
          }),
          toArray(),
          map(() => loadFlightsSuccess()),
          catchError(() => EMPTY),
        );
      }),
    );
  });
}
