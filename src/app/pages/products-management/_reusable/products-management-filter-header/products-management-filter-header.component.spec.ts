import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementFilterHeaderComponent } from './products-management-filter-header.component';

describe('ProductsManagementFilterHeaderComponent', () => {
  let component: ProductsManagementFilterHeaderComponent;
  let fixture: ComponentFixture<ProductsManagementFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsManagementFilterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsManagementFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
