import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturesManagementItemComponent } from './manufactures-management-item.component';

describe('ManufacturesManagementItemComponent', () => {
  let component: ManufacturesManagementItemComponent;
  let fixture: ComponentFixture<ManufacturesManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturesManagementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturesManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
