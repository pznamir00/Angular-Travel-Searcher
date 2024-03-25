import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { loadAirports } from 'src/app/store/airports/airports.actions';
import { selectAirports } from 'src/app/store/airports/airports.selector';
import { FlightsHttpService } from '../services/flights-http.service';
import { AirportsLoaderResolver } from './airports-loader.resolver';

describe('AirportsLoaderResolver', () => {
  let resolver: AirportsLoaderResolver;
  const airports: any[] = [{ airport: 1 }, { airport: 2 }, { airport: 3 }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(FlightsHttpService, {
          getAirportsList: jest.fn(() =>
            of({
              data: airports,
            } as any),
          ),
        }),
        MockProvider(Store, {
          dispatch: jest.fn(),
          select: jest.fn(() => of({})),
        }),
      ],
    });
    resolver = TestBed.inject(AirportsLoaderResolver);
  });

  it('should dispatch loadAirports', () => {
    const store = TestBed.inject(Store);
    resolver.resolve(
      {
        queryParams: {
          range: 50,
          origLat: 10,
          origLon: 12,
          destLat: 50,
          destLon: 34,
        },
      } as any,
      {} as any,
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      loadAirports({
        origin: { latitude: 10, longitude: 12 },
        destination: { latitude: 50, longitude: 34 },
        range: 50,
      }),
    );
  });

  it('should select selectAirports', () => {
    const store = TestBed.inject(Store);
    resolver.resolve(
      {
        queryParams: {
          range: 50,
          origLat: 10,
          origLon: 12,
          destLat: 50,
          destLon: 34,
        },
      } as any,
      {} as any,
    );
    //@ts-ignore
    expect(store.select).toHaveBeenCalledWith(selectAirports);
  });
});
