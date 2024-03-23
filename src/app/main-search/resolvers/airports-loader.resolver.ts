import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import * as Papa from 'papaparse';
import { Observable, map } from 'rxjs';
import { AirportsHttpService } from '../services/airports-http.service';

@Injectable({
  providedIn: 'root',
})
export class AirportsLoaderResolver implements Resolve<boolean> {
  constructor(private _airportsHttpService: AirportsHttpService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this._airportsHttpService.getAirportsList().pipe(
      map((result) => {
        return Papa.parse(result).data;
      }),
    );
  }
}
