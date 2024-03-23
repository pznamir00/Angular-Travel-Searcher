import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AirportsHttpService } from './airports-http.service';

describe('AirportsHttpService', () => {
  let service: AirportsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AirportsHttpService,
        //@ts-ignore
        MockProvider(HttpClient, {
          get: jest.fn(() => of('MOCK')),
        }),
      ],
    });
    service = TestBed.inject(AirportsHttpService);
  });

  describe('getAirportsList', () => {
    it('returns http.get', (done) => {
      service.getAirportsList().subscribe((res) => {
        expect(res).toEqual('MOCK');
        done();
      });
    });
  });
});
