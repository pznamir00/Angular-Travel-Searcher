import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AirportsResult } from '../../types/airport.type';
import { FlightsResult } from '../types/flights-result.type';

const TOKEN = 'BqQLjAdtA3Bw73alL2VRPb8i7cGT';

@Injectable({
  providedIn: 'root',
})
export class FlightsHttpService extends ApiService {
  getAirportsList(lat: number, lon: number, radius: number) {
    return this.http.get<AirportsResult>(
      `https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${lat}&longitude=${lon}&radius=${radius}&page%5Blimit%5D=5&page%5Boffset%5D=0&sort=relevance`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  }

  getFlightsList(
    originIATA: string,
    destinationIATA: string,
    startDate: string,
    endDate: string,
  ) {
    return this.http.post<FlightsResult>(
      `https://test.api.amadeus.com/v2/shopping/flight-offers`,
      {
        currencyCode: 'USD',
        originDestinations: [
          {
            id: '1',
            originLocationCode: originIATA,
            destinationLocationCode: destinationIATA,
            departureDateTimeRange: {
              date: startDate,
              time: '00:00:00',
            },
            returnDateTimeRange: {
              date: endDate,
              time: '00:00:00',
            },
          },
        ],
        travelers: [
          {
            id: '1',
            travelerType: 'ADULT',
          },
        ],
        sources: ['GDS'],
        searchCriteria: {
          maxFlightOffers: 2,
          flightFilters: {
            cabinRestrictions: [
              {
                cabin: 'BUSINESS',
                coverage: 'MOST_SEGMENTS',
                originDestinationIds: ['1'],
              },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  }
}
