import { createReducer, on } from '@ngrx/store';
import { AirportsByPoint } from 'src/app/results/types/airports-by-point.type';
import { loadAirportsSuccess } from './airports.actions';

type AirportState = AirportsByPoint;

const initialValue: AirportState = {
  origin: [],
  destination: [],
};

export const airportsReducer = createReducer(
  initialValue,
  on(loadAirportsSuccess, (_, { airports }) => ({ ...airports })),
);
