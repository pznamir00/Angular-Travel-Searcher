import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadAllFlights } from './flights.action';

@Injectable()
export class FlightsEffects {
  constructor(private _actions$: Actions) {}

  loadAllFlights$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadAllFlights),
      //
    );
  });
}
