import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  OSMAddressResult,
  OSMCoordsResult,
} from '../types/open-street-map-result.type';

@Injectable({
  providedIn: 'root',
})
export class GeolocationHttpService extends ApiService {
  getAddressByCoordinates(position: GeolocationPosition['coords']) {
    const { latitude: lat, longitude: lon } = position;
    return this.http.get<OSMAddressResult>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
  }

  getCoordinatesByAddress(address: string) {
    return this.http.get<OSMCoordsResult[]>(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${address}`,
    );
  }
}
