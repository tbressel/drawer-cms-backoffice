import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFilesSettingComponent } from './unit-files-setting.component';

describe('UnitFilesSettingComponent', () => {
  let component: UnitFilesSettingComponent;
  let fixture: ComponentFixture<UnitFilesSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitFilesSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitFilesSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
