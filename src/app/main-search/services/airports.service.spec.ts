/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AirportsService } from './airports.service';

describe('Service: Airports', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirportsService]
    });
  });

  it('should ...', inject([AirportsService], (service: AirportsService) => {
    expect(service).toBeTruthy();
  }));
});
