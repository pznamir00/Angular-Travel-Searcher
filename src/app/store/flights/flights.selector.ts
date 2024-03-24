import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState, adapter } from './flights.reducer';

export const selectFlightsState =
  createFeatureSelector<FlightsState>('flights');

const { selectAll } = adapter.getSelectors();

export const selectFlights = createSelector(selectFlightsState, selectAll);

export const selectFlightsLoadedNumber = createSelector(
  selectFlightsState,
  (state) => state.loaded,
);

export const selectFlightsTotalNumber = createSelector(
  selectFlightsState,
  (state) => state.total,
);
