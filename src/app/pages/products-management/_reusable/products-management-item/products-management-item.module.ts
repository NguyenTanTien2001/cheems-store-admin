import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementItemComponent } from './products-management-item.component';
import { ProductsManagementItemChildModule } from './_reusable/products-management-item-child/products-management-item-child.module';



@NgModule({
  declarations: [
    ProductsManagementItemComponent
  ],
  imports: [
    CommonModule,
    ProductsManagementItemChildModule
  ],
  exports: [ProductsManagementItemComponent]
})
export class ProductsManagementItemModule { }
