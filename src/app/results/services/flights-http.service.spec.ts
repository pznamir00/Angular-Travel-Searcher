import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { FlightsHttpService } from './flights-http.service';

describe('FlightsHttpService', () => {
  let service: FlightsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightsHttpService,
        //@ts-ignore
        MockProvider(HttpClient, {
          get: jest.fn(() => of('MOCK')),
        }),
      ],
    });
    service = TestBed.inject(FlightsHttpService);
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
