import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { Airport } from '../types/airport.type';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  constructor() {}

  csvStringToAirports(csvString: string) {
    const { data } = Papa.parse<string[]>(csvString);
    return data.map(
      (item): Airport => ({
        id: +item[0],
        name: item[1],
        city: item[2],
        country: item[3],
        iata: item[4],
        icao: item[5],
        latitude: +item[6],
        longitude: +item[7],
      }),
    );
  }
}
