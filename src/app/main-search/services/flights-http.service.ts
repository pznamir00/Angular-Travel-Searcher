import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsHttpService extends ApiService {
  getFlights(
    originIATA: string,
    destinationIATA: string,
    outboundDate: string,
    returnDate: string,
  ) {
    return this.http.get(
      `http://localhost:3000/flights?departure_id=${originIATA}&arrival_id=${destinationIATA}&outbound_date=${outboundDate}&return_date=${returnDate}`,
    );
  }
}
