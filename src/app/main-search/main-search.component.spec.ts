import { NO_ERRORS_SCHEMA, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MainSearchComponent } from './main-search.component';
import { GeolocationHttpService } from './services/geolocation-http.service';
import { AddressInputComponent } from './value-accessors/address-input/address-input.component';

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

  it('unblocks submit button if form is valid', async () => {
    const fixture = await setup();
    const submitBtn = screen.getByTestId('submit-btn');
    const addressInputs = screen.getAllByTestId('address-input');
    userEvent.type(addressInputs[0], 'aaa');
    userEvent.type(addressInputs[1], 'bbb');
    const { form } = fixture.debugElement.componentInstance;
    form.controls.dates.setValue({
      start: new Date(),
      end: new Date(),
    });

    await waitFor(
      () => {
        fixture.detectChanges();
        //@ts-ignore
        expect(submitBtn.disabled).toBeFalsy();
      },
      { timeout: 5000, interval: 1000 },
    );
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
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ReactiveFormsModule],
    declarations: [AddressInputComponent],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AddressInputComponent),
        multi: true,
      },
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
