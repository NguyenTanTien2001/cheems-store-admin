import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementItemChildComponent } from './categories-management-item-child.component';

describe('CategoriesManagementItemChildComponent', () => {
  let component: CategoriesManagementItemChildComponent;
  let fixture: ComponentFixture<CategoriesManagementItemChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementItemChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesManagementItemChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
