import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementTableViewComponent } from './products-management-table-view.component';

describe('ProductsManagementTableViewComponent', () => {
  let component: ProductsManagementTableViewComponent;
  let fixture: ComponentFixture<ProductsManagementTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsManagementTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsManagementTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
