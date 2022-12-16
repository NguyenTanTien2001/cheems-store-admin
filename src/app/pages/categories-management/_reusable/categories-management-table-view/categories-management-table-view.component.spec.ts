import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementTableViewComponent } from './categories-management-table-view.component';

describe('CategoriesManagementTableViewComponent', () => {
  let component: CategoriesManagementTableViewComponent;
  let fixture: ComponentFixture<CategoriesManagementTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesManagementTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
