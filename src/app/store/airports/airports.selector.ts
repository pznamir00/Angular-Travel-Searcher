import { createFeatureSelector } from '@ngrx/store';
import { Airport } from 'src/app/types/airport.type';

export const selectAirports = createFeatureSelector<Airport[]>('airports');
