import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturesManagementItemChildComponent } from './manufactures-management-item-child.component';

describe('ManufacturesManagementItemChildComponent', () => {
  let component: ManufacturesManagementItemChildComponent;
  let fixture: ComponentFixture<ManufacturesManagementItemChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturesManagementItemChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturesManagementItemChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
