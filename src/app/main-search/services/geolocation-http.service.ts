import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenStreetMapResult } from '../types/open-street-map-result.type';

@Injectable({
  providedIn: 'root',
})
export class GeolocationHttpService {
  constructor(private _http: HttpClient) {}

  getAddressByCoordinates(position: GeolocationPosition['coords']) {
    const { latitude: lat, longitude: lon } = position;
    return this._http.get<OpenStreetMapResult>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
  }
}
