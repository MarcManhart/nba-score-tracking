import { TestBed } from '@angular/core/testing';

import { TeamStoreService } from './team-store.service';

describe('TeamStoreService', () => {
  let service: TeamStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
