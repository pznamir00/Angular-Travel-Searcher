import { TestBed } from '@angular/core/testing';

import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AirportsHttpService } from '../services/airports-http.service';
import { AirportsService } from '../services/airports.service';
import { AirportsLoaderResolver } from './airports-loader.resolver';

describe('AirportsLoaderResolver', () => {
  let resolver: AirportsLoaderResolver;

  const csvContent = `1,Some Airport,London,UK,SA,SAA,48,10
  2,Airport 2,Pekin,China,PK,PKK,10,88`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AirportsService, {
          csvStringToAirports: jest.fn(),
        }),
        MockProvider(AirportsHttpService, {
          getAirportsList: jest.fn(() => of(csvContent)),
        }),
      ],
    });
    resolver = TestBed.inject(AirportsLoaderResolver);
  });

  describe('resolve', () => {
    it('calls getAirportsList', (done) => {
      const { getAirportsList } = TestBed.inject(AirportsHttpService);
      //@ts-ignore
      resolver.resolve({}, {}).subscribe(() => {
        expect(getAirportsList).toHaveBeenCalled();
        done();
      });
    });

    it('calls getAirportsList', (done) => {
      const { csvStringToAirports } = TestBed.inject(AirportsService);
      //@ts-ignore
      resolver.resolve({}, {}).subscribe(() => {
        expect(csvStringToAirports).toHaveBeenCalledWith(
          csvContent,
          //@ts-ignore
          expect.anything(),
        );
        done();
      });
    });
  });
});
