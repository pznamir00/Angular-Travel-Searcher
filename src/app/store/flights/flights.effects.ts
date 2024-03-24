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
} from 'rxjs';
import { FlightsHttpService } from 'src/app/results/services/flights-http.service';
import { FlightsService } from 'src/app/results/services/flights.service';
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
        return from(combinations)
          .pipe(
            concatMap((airportsByPoint) =>
              this._flightsHttpService
                .getFlightsList(
                  airportsByPoint.origin.iataCode,
                  airportsByPoint.destination.iataCode,
                  startDate,
                  endDate,
                )
                .pipe(
                  tap((result) =>
                    this._store.dispatch(addFlights({ flights: result.data })),
                  ),
                  delay(500),
                ),
            ),
          )
          .pipe(
            map(() => loadFlightsSuccess()),
            catchError(() => EMPTY),
          );
      }),
    );
  });

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
