import { TestBed } from '@angular/core/testing';
import { AirportsService } from './airports.service';

describe('AirportsService', () => {
  let service: AirportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirportsService],
    });
    service = TestBed.inject(AirportsService);
  });

  describe('csvStringToAirports', () => {
    it('converts csv string to objects', () => {
      const csv = `1,Some Airport,London,UK,SA,SAA,48,10
      2,Airport 2,Pekin,China,PK,PKK,10,88`;
      const result = service.csvStringToAirports(csv);
      expect(result.length).toEqual(2);
    });
  });
});
