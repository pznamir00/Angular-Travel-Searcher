import { createAction, props } from '@ngrx/store';
import { Airport } from 'src/app/types/airport.type';

export const loadAirports = createAction('[Airports] Load');

export const loadAirportsSuccess = createAction(
  '[Airports] Load success',
  props<{ airports: Airport[] }>(),
);
