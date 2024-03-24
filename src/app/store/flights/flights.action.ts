import { createAction, props } from '@ngrx/store';
import { Flight } from 'src/app/results/types/flights-result.type';
import { Airport } from 'src/app/types/airport.type';

export const loadAllFlights = createAction(
  '[Flights] Load all',
  props<{
    startDate: Date;
    endDate: Date;
    combinations: { origin: Airport; destination: Airport }[];
  }>(),
);

export const addFlights = createAction(
  '[Flights] Add',
  props<{ flights: Flight[] }>(),
);

export const loadFlightsSuccess = createAction('[Flights] Load success');
