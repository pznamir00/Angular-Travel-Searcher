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
          get: jest.fn(() => of('GET RESPONSE')),
          post: jest.fn(() => of('POST RESPONSE')),
        }),
      ],
    });
    service = TestBed.inject(FlightsHttpService);
  });

  describe('getAirportsList', () => {
    it('returns http.get', (done) => {
      service.getAirportsList(5, 6, 10).subscribe((res) => {
        //@ts-ignore
        expect(res).toEqual('GET RESPONSE');
        done();
      });
    });
  });

  describe('getFlightsList', () => {
    it('returns http.post', (done) => {
      service
        .getFlightsList('xxx', 'yyy', '2020-10-10', '2022-05-05')
        .subscribe((res) => {
          //@ts-ignore
          expect(res).toEqual('POST RESPONSE');
          done();
        });
    });
  });
});
