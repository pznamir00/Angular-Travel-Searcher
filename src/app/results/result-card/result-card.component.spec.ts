import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { MockPipe } from 'ng-mocks';
import { FlightNamePipe } from '../pipes/flight-name.pipe';
import { FlightTimesPipe } from '../pipes/flight-times.pipe';
import { ResultCardComponent } from './result-card.component';

describe('ResultCardComponent', () => {
  it('renders flight name', async () => {
    await setup();
    const name = screen.queryByText(/JKE 2445/i);
    expect(name).toBeTruthy();
  });

  it('renders flight time', async () => {
    await setup();
    const time = screen.queryByText(/2020-10-10 10:45:00/i);
    expect(time).toBeTruthy();
  });

  it('renders flight price', async () => {
    await setup();
    const price = screen.queryByText(/\$455/i);
    expect(price).toBeTruthy();
  });
});

const setup = async () => {
  const fixture = await render(ResultCardComponent, {
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [
      MockPipe(FlightNamePipe, () => 'JKE 2445'),
      MockPipe(FlightTimesPipe, () => '2020-10-10 10:45:00'),
    ],
    componentProperties: {
      flight: {
        price: {
          total: 455,
        },
      },
    } as any,
  });
  return fixture;
};
