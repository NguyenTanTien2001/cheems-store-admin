import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturesManagementComponent } from './manufactures-management.component';

describe('ManufacturesManagementComponent', () => {
  let component: ManufacturesManagementComponent;
  let fixture: ComponentFixture<ManufacturesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
