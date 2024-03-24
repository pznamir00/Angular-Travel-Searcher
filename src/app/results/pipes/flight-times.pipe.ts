import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../types/flights-result.type';

@Pipe({
  name: 'flightTimes',
})
export class FlightTimesPipe implements PipeTransform {
  transform(flight: Flight): string {
    const { segments } = flight.itineraries[0];
    const from = new Date(segments[0].departure.at)
      .toUTCString()
      .replace(' GMT', '');
    const to = new Date(segments[segments.length - 1].arrival.at)
      .toUTCString()
      .replace(' GMT', '');
    return `${from} - ${to}`;
  }
}
