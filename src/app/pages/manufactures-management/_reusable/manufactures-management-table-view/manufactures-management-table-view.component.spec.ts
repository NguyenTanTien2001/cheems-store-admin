import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturesManagementTableViewComponent } from './manufactures-management-table-view.component';

describe('ManufacturesManagementTableViewComponent', () => {
  let component: ManufacturesManagementTableViewComponent;
  let fixture: ComponentFixture<ManufacturesManagementTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturesManagementTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturesManagementTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
