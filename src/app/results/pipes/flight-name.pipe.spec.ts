import { FlightNamePipe } from './flight-name.pipe';

describe('FlightNamePipe', () => {
  let pipe: FlightNamePipe;

  beforeEach(() => {
    pipe = new FlightNamePipe();
  });

  it('transforms pipe correctly', () => {
    const flight: any = {
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: 'ABC' },
            },
            {},
            {
              arrival: { iataCode: 'XYZ' },
            },
          ],
        },
      ],
    };
    expect(pipe.transform(flight)).toEqual('ABC - XYZ (indirect)');
  });

  it('transforms pipe correctly when direct flight', () => {
    const flight: any = {
      itineraries: [
        {
          segments: [
            {
              departure: { iataCode: 'ABC' },
            },
            {
              arrival: { iataCode: 'XYZ' },
            },
          ],
        },
      ],
    };
    expect(pipe.transform(flight)).toEqual('ABC - XYZ (indirect)');
  });
});
