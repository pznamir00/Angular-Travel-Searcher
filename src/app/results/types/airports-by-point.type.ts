import { Airport } from 'src/app/types/airport.type';

export interface AirportsByPoint {
  origin: Airport[];
  destination: Airport[];
}

export interface SingleAirportByPoint {
  origin: Airport;
  destination: Airport;
}
