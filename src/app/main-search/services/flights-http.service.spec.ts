/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlightsHttpService } from './flights-http.service';

describe('Service: FlightsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightsHttpService]
    });
  });

  it('should ...', inject([FlightsHttpService], (service: FlightsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
