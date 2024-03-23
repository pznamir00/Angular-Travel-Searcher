import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OSMAddressResult,
  OSMCoordsResult,
} from '../types/open-street-map-result.type';

@Injectable({
  providedIn: 'root',
})
export class GeolocationHttpService {
  constructor(private _http: HttpClient) {}

  getAddressByCoordinates(position: GeolocationPosition['coords']) {
    const { latitude: lat, longitude: lon } = position;
    return this._http.get<OSMAddressResult>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
  }

  getCoordinatesByAddress(address: string) {
    return this._http.get<OSMCoordsResult[]>(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${address}`,
    );
  }
}
