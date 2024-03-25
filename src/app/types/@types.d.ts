import '@angular/forms';
import { LatLon } from '../main-search/types/geolocation.type';

declare module '@angular/forms' {
  interface AbstractControl {
    metadata?: {
      coords: LatLon | null;
    };
  }
}
