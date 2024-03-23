/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AirportsHttpService } from './airports-http.service';

describe('Service: Airports', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirportsHttpService],
    });
  });

  it('should ...', inject(
    [AirportsHttpService],
    (service: AirportsHttpService) => {
      expect(service).toBeTruthy();
    },
  ));
});
