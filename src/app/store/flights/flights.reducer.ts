import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Flight } from 'src/app/results/types/flights-result.type';
import { addFlights } from './flights.action';

export interface FlightsState extends EntityState<Flight> {}

export const adapter = createEntityAdapter<Flight>();

export const airportsReducer = createReducer(
  adapter.getInitialState(),
  on(addFlights, (state, { flights }) => adapter.addMany(flights, state)),
);
