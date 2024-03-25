import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { GeolocationHttpService } from '../../services/geolocation-http.service';
import { AddressInputComponent } from './address-input.component';

describe('AddressInputComponent', () => {
  it('calls getCoordinatesByAddress on change', async () => {
    await setup();
    const { getCoordinatesByAddress } = TestBed.inject(GeolocationHttpService);
    const input = screen.getByTestId('address-input');
    userEvent.type(input, 'Ma');
    await waitFor(() => expect(getCoordinatesByAddress).toHaveBeenCalled(), {
      timeout: 5000,
    });
  });

  it('marks input as invalid if there is no location', async () => {
    const fixture = await setup();
    const { getCoordinatesByAddress } = TestBed.inject(GeolocationHttpService);
    //@ts-ignore
    getCoordinatesByAddress.mockReturnValueOnce([]);
    const input = screen.getByTestId('address-input');
    userEvent.type(input, 'Ma');
    await new Promise((r) => setTimeout(r, 1000));
    const { form } = fixture.debugElement.componentInstance;
    expect(form.controls.field.invalid).toBeTruthy();
  });
});

@Component({
  template: `
    <form [formGroup]="form">
      <app-address-input formControlName="field"></app-address-input>
    </form>
  `,
})
class WrapperComponent {
  form = new FormGroup({
    field: new FormControl(''),
  });
}

const setup = async () => {
  const fixture = await render(WrapperComponent, {
    declarations: [AddressInputComponent],
    imports: [ReactiveFormsModule],
    providers: [
      //@ts-ignore
      MockProvider(GeolocationHttpService, {
        getCoordinatesByAddress: jest.fn(() =>
          of([
            {
              lat: 15,
              lon: 66,
            },
          ]),
        ),
      }),
    ],
  });

  return fixture;
};
