import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AirportsResult } from '../../types/airport.type';

@Injectable({
  providedIn: 'root',
})
export class AirportsHttpService extends ApiService {
  getAirportsList(lat: number, lon: number, radius: number) {
    return this.http.get<AirportsResult>(
      `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${lat}&longitude=${lon}&radius=${radius}&page%5Blimit%5D=5&page%5Boffset%5D=0&sort=relevance`,
      {
        headers: {
          Authorization: 'Bearer vl4ESgaGSwuAGmG2Jf2akrcsRJFf',
        },
      },
    );
  }
}
