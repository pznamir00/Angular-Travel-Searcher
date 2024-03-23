import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MainSearchComponent } from './main-search.component';
import { GeolocationHttpService } from './services/geolocation-http.service';

describe('MainSearchComponent', () => {
  it('loads user location on init', async () => {
    await setup();
    expect(window.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('blocks submit button if form is not valid', async () => {
    await setup();
    const submitBtn = screen.getByTestId('submit-btn');
    //@ts-ignore
    expect(submitBtn.disabled).toBeTruthy();
  });
});

const setup = async () => {
  //@ts-ignore
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(function (callback) {
      callback({
        //@ts-ignore
        coords: {
          latitude: 14,
          longitude: 87,
        },
      });
    }),
  };

  const fixture = await render(MainSearchComponent, {
    imports: [ReactiveFormsModule],
    providers: [
      //@ts-ignore
      MockProvider(GeolocationHttpService, {
        getAddressByCoordinates: jest.fn(() =>
          of({
            display_name: 'street 3309 21 city',
            address: {
              house_number: '21',
              road: 'street',
              residential: '',
              suburb: 'ss',
              city: 'city',
              state: 'state',
              'ISO3166-2-lvl4': '',
              postcode: '3309',
              country: '',
              country_code: '339982',
            },
          }),
        ),
        getCoordinatesByAddress: jest.fn(() =>
          of([
            {
              place_id: 12,
              licence: '',
              osm_type: '',
              osm_id: 1,
              lat: '34.902',
              lon: '13.598',
              category: '',
              type: '',
              place_rank: 4,
              importance: 2137,
              addresstype: 'pp',
              name: 'name',
              display_name: 'some address 21',
              boundingbox: ['', '', '', ''],
            },
          ]),
        ),
      }),
    ],
  });

  return fixture;
};
