import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagementItemComponent } from './products-management-item.component';

describe('ProductsManagementItemComponent', () => {
  let component: ProductsManagementItemComponent;
  let fixture: ComponentFixture<ProductsManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsManagementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
