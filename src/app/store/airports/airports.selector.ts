import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AirportState, adapter } from './airports.reducer';

export const selectAirportState =
  createFeatureSelector<AirportState>('airports');

const { selectAll } = adapter.getSelectors();

export const selectAirports = createSelector(selectAirportState, selectAll);
