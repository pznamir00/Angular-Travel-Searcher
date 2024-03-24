import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Flight } from 'src/app/results/types/flights-result.type';
import { addFlights, loadFlightsSuccess, resetFlights } from './flights.action';

export interface FlightsState extends EntityState<Flight> {
  loading: boolean;
}

const initialValue: FlightsState = {
  ids: [],
  entities: {},
  loading: true,
};

export const adapter = createEntityAdapter<Flight>();

export const airportsReducer = createReducer(
  initialValue,
  on(addFlights, (state, { flights }) => adapter.addMany(flights, state)),
  on(loadFlightsSuccess, (state) => ({ ...state, loading: false })),
  on(resetFlights, (_) => initialValue),
);
