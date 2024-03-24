import { createSelector } from '@ngrx/store';
import { AirportsByPoint } from 'src/app/results/types/airports-by-point.type';

export const selectAirportsState = (state: any) => state.airports;

export const selectAirports = createSelector(
  selectAirportsState,
  (airports: AirportsByPoint) => ({ ...airports }),
);
