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
import { FlightsHttpService } from 'src/app/results/services/flights-http.service';
import { FlightsService } from 'src/app/results/services/flights.service';
import { v4 as uuidv4 } from 'uuid';
import {
  addFlights,
  loadAllFlights,
  loadFlightsSuccess,
  resetFlights,
} from './flights.action';

@Injectable()
export class FlightsEffects {
  constructor(
    private _actions$: Actions,
    private _flightsHttpService: FlightsHttpService,
    private _store: Store,
    private _flightsService: FlightsService,
  ) {}

  loadAllFlights$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadAllFlights),
      mergeMap(({ startDate, endDate, combinations }) => {
        return from(combinations).pipe(
          concatMap((airportsByPoint) =>
            this._flightsHttpService
              .getFlightsList(
                airportsByPoint.origin.iataCode,
                airportsByPoint.destination.iataCode,
                startDate,
                endDate,
              )
              .pipe(
                map((result) => structuredClone(result)),
                tap((result) => {
                  const flights = result.data.map((flight) => ({
                    ...flight,
                    key: uuidv4(),
                  }));
                  this._store.dispatch(addFlights({ flights }));
                }),
                delay(500),
              ),
          ),
          toArray(),
          map(() => loadFlightsSuccess()),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  loadFlightsSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(loadFlightsSuccess),
        tap(() => {
          this._flightsService.setLoading(false);
        }),
      );
    },
    { dispatch: false },
  );

  resetFlights$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(resetFlights),
        tap(() => {
          this._flightsService.setLoading(true);
        }),
      );
    },
    { dispatch: false },
  );
}
