import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { AirportsHttpService } from 'src/app/services/airports-http.service';
import { AirportsService } from 'src/app/services/airports.service';
import { loadAirports, loadAirportsSuccess } from './airports.actions';

@Injectable()
export class AirportsEffects {
  constructor(
    private _actions$: Actions,
    private _airportsService: AirportsService,
    private _airportsHttpService: AirportsHttpService,
  ) {}

  loadAirports$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadAirports),
      mergeMap(() => {
        return this._airportsHttpService.getAirportsList().pipe(
          map(this._airportsService.csvStringToAirports),
          map((airports) => loadAirportsSuccess({ airports })),
          catchError(() => EMPTY),
        );
      }),
    );
  });
}
