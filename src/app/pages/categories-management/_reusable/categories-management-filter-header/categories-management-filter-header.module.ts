import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesManagementFilterHeaderComponent } from './categories-management-filter-header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoriesManagementFilterHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CategoriesManagementFilterHeaderComponent]
})
export class CategoriesManagementFilterHeaderModule { }
