import { FlightTimesPipe } from './flight-times.pipe';

describe('FlightTimesPipe', () => {
  let pipe: FlightTimesPipe;

  beforeEach(() => {
    pipe = new FlightTimesPipe();
  });

  it('converts flight to times string', () => {
    const flight: any = {
      itineraries: [
        {
          segments: [
            {
              departure: { at: '2020-10-10 10:00:00' },
            },
            {
              arrival: { at: '2020-10-11 15:00:00' },
            },
          ],
        },
      ],
    };
    expect(pipe.transform(flight)).toEqual(
      'Sat, 10 Oct 2020 08:00:00 - Sun, 11 Oct 2020 13:00:00',
    );
  });
});
