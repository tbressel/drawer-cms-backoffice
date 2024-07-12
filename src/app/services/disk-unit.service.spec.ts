import { TestBed } from '@angular/core/testing';

import { DiskUnitService } from './disk-unit.service';

describe('DiskUnitService', () => {
  let service: DiskUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiskUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
