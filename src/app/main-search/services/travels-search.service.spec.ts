import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { TravelsSearchService } from './travels-search.service';

describe('TravelsSearchService', () => {
  let service: TravelsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TravelsSearchService,
        MockProvider(ActivatedRoute, {
          data: of({ airports: [] }),
        }),
      ],
    });
    service = TestBed.inject(TravelsSearchService);
  });

  describe('searchTravels', () => {
    it('', () => {});
  });
});
