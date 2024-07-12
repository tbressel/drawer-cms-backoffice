import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskUnitsSettingComponent } from './disk-units-setting.component';

describe('DiskUnitsSettingComponent', () => {
  let component: DiskUnitsSettingComponent;
  let fixture: ComponentFixture<DiskUnitsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiskUnitsSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiskUnitsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
