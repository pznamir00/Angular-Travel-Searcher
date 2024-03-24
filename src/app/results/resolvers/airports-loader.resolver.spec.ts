import { TestBed } from '@angular/core/testing';

import { AirportsLoaderResolver } from './airports-loader.resolver';

describe('AirportsLoaderResolver', () => {
  let resolver: AirportsLoaderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AirportsLoaderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
