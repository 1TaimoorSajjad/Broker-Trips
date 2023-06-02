import { TestBed } from '@angular/core/testing';

import { SbrokerService } from './sbroker.service';

describe('SbrokerService', () => {
  let service: SbrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
