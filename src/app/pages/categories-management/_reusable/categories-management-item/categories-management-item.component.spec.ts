import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementItemComponent } from './categories-management-item.component';

describe('CategoriesManagementItemComponent', () => {
  let component: CategoriesManagementItemComponent;
  let fixture: ComponentFixture<CategoriesManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
