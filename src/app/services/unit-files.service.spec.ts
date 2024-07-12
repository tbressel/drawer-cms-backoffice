import { TestBed } from '@angular/core/testing';

import { UnitFilesService } from './unit-files.service';

describe('UnitFilesService', () => {
  let service: UnitFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
