import { TestBed } from '@angular/core/testing';

import { NBADataService } from './nba-data.service';

describe('NBADataService', () => {
  let service: NBADataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NBADataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
