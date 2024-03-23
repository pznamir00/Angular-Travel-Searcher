import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Airport } from 'src/app/types/airport.type';
import { loadAirportsSuccess } from './airports.actions';

export interface AirportState extends EntityState<Airport> {}

export const adapter = createEntityAdapter<Airport>();

export const airportsReducer = createReducer(
  adapter.getInitialState(),
  on(loadAirportsSuccess, (state, { airports }) =>
    adapter.setAll(airports, state),
  ),
);
