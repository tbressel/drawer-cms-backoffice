import { TestBed } from '@angular/core/testing';

import { MenuSettingService } from './menu-setting.service';

describe('MenuSettingService', () => {
  let service: MenuSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
