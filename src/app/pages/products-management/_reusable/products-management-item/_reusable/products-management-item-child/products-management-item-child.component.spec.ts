import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementItemChildComponent } from './products-management-item-child.component';

describe('ProductsManagementItemChildComponent', () => {
  let component: ProductsManagementItemChildComponent;
  let fixture: ComponentFixture<ProductsManagementItemChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsManagementItemChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsManagementItemChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
