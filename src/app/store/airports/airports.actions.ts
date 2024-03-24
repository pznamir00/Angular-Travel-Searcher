import { createAction, props } from '@ngrx/store';
import { LatLon } from 'src/app/main-search/types/geolocation.type';
import { AirportsByPoint } from 'src/app/results/types/airports-by-point.type';

export const loadAirports = createAction(
  '[Airports] Load',
  props<{
    origin: LatLon;
    destination: LatLon;
    range: number;
  }>(),
);

export const loadAirportsSuccess = createAction(
  '[Airports] Load success',
  props<{ airports: AirportsByPoint }>(),
);
