import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Flight } from 'src/app/results/types/flights-result.type';
import { addFlights, loadAllFlights, resetFlights } from './flights.action';

export interface FlightsState extends EntityState<Flight> {
  loaded: number;
  total: number;
}

const initialValue: FlightsState = {
  ids: [],
  entities: {},
  loaded: 0,
  total: 0,
};

export const adapter = createEntityAdapter<Flight>({
  selectId: (flight) => flight.key,
});

export const flightsReducer = createReducer(
  initialValue,
  on(loadAllFlights, (state, { combinations }) => ({
    ...state,
    total: combinations.length,
  })),
  on(addFlights, (state, { flights }) => ({
    ...adapter.addMany(flights, state),
    loaded: state.loaded + 1,
  })),
  on(resetFlights, (_) => initialValue),
);
