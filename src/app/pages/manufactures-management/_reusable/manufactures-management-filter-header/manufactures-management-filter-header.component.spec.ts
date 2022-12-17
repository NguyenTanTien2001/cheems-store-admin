import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturesManagementFilterHeaderComponent } from './manufactures-management-filter-header.component';

describe('ManufacturesManagementFilterHeaderComponent', () => {
  let component: ManufacturesManagementFilterHeaderComponent;
  let fixture: ComponentFixture<ManufacturesManagementFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturesManagementFilterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturesManagementFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
