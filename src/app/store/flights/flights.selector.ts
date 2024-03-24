import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState, adapter } from './flights.reducer';

export const selectFlightsState =
  createFeatureSelector<FlightsState>('flights');

const { selectAll } = adapter.getSelectors();

export const selectFlights = createSelector(selectFlightsState, selectAll);
