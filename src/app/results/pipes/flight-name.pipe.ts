import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../types/flights-result.type';

@Pipe({
  name: 'flightName',
})
export class FlightNamePipe implements PipeTransform {
  transform(flight: Flight): string {
    const { segments } = flight.itineraries[0];
    const isDirect = segments.length === 1;
    return `${segments[0].departure.iataCode} - ${segments[segments.length - 1].arrival.iataCode} (${isDirect ? 'direct' : 'indirect'})`;
  }
}
