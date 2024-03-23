/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeolocationHttpService } from './geolocation-http.service';

describe('GeolocationHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationHttpService],
    });
  });

  it('should ...', inject(
    [GeolocationHttpService],
    (service: GeolocationHttpService) => {
      expect(service).toBeTruthy();
    },
  ));
});
