import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { render, screen, waitFor } from '@testing-library/angular';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { FlightsEffects } from '../store/flights/flights.effects';
import { flightsReducer } from '../store/flights/flights.reducer';
import { FlightNamePipe } from './pipes/flight-name.pipe';
import { FlightTimesPipe } from './pipes/flight-times.pipe';
import { ResultCardComponent } from './result-card/result-card.component';
import { ResultsComponent } from './results.component';
import { FlightsHttpService } from './services/flights-http.service';

describe('ResultsComponent', () => {
  it('updates result text', async () => {
    await setup();
    await waitFor(() => expect(screen.queryByText(/2 Results/i)).toBeTruthy());
  });

  it('updates progress bar', async () => {
    await setup();
    const bar = screen.getByTestId('progress-bar');
    //@ts-ignore
    await waitFor(() => expect(bar.value).toEqual(100));
  });

  it('shows result cards', async () => {
    await setup();
    await waitFor(() => {
      const cards = screen.queryAllByTestId('flight-card');
      expect(cards.length).toEqual(2);
    });
  });
});

const setup = async () => {
  const fixture = await render(ResultsComponent, {
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      MockProvider(ActivatedRoute, {
        queryParams: of({ startDate: '2020-10-10', endDate: '2020-11-11' }),
        data: of({
          airports: {
            origin: [{ airport: 1 }, { airport: 2 }],
            destination: [{ airport: 3 }],
          },
        }),
      }),
      //@ts-ignore
      MockProvider(FlightsHttpService, {
        getFlightsList: jest.fn(() =>
          of({ data: [{ price: { total: 213 } }, { price: { total: 566 } }] }),
        ),
      }),
    ],
    imports: [
      StoreModule.forRoot({ flights: flightsReducer }),
      EffectsModule.forRoot([FlightsEffects]),
    ],
    declarations: [
      ResultCardComponent,
      MockPipe(FlightNamePipe),
      MockPipe(FlightTimesPipe),
    ],
  });
  return fixture;
};
