import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { GeolocationHttpService } from './geolocation-http.service';

describe('GeolocationHttpService', () => {
  let service: GeolocationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeolocationHttpService,
        //@ts-ignore
        MockProvider(HttpClient, {
          get: jest.fn(() => of({})),
        }),
      ],
    });
    service = TestBed.inject(GeolocationHttpService);
  });

  describe('getAddressByCoordinates', () => {
    it('calls http.get with params', () => {
      const { get } = TestBed.inject(HttpClient);
      //@ts-ignore
      service.getAddressByCoordinates({
        latitude: 12,
        longitude: 15,
      });
      expect(get).toHaveBeenCalledWith(
        //@ts-ignore
        expect.stringContaining('lat=12&lon=15'),
      );
    });
  });

  describe('getCoordinatesByAddress', () => {
    it('calls http.get with params', () => {
      const { get } = TestBed.inject(HttpClient);
      //@ts-ignore
      service.getCoordinatesByAddress('Houston');
      expect(get).toHaveBeenCalledWith(
        //@ts-ignore
        expect.stringContaining('q=Houston'),
      );
    });
  });
});
