import { createAction, props } from '@ngrx/store';
import { SingleAirportByPoint } from 'src/app/results/types/airports-by-point.type';
import { Flight } from 'src/app/results/types/flights-result.type';

export const loadAllFlights = createAction(
  '[Flights] Load all',
  props<{
    startDate: string;
    endDate: string;
    combinations: SingleAirportByPoint[];
  }>(),
);

export const addFlights = createAction(
  '[Flights] Add',
  props<{ flights: Flight[] }>(),
);

export const loadFlightsSuccess = createAction('[Flights] Load success');

export const resetFlights = createAction('[Flights] Reset');
