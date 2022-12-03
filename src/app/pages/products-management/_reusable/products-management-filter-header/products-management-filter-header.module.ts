import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementFilterHeaderComponent } from './products-management-filter-header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsManagementFilterHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ProductsManagementFilterHeaderComponent]
})
export class ProductsManagementFilterHeaderModule { }
