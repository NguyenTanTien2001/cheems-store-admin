import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementFilterHeaderComponent } from './categories-management-filter-header.component';

describe('CategoriesManagementFilterHeaderComponent', () => {
  let component: CategoriesManagementFilterHeaderComponent;
  let fixture: ComponentFixture<CategoriesManagementFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementFilterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesManagementFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
