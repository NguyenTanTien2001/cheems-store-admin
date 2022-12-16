import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesManagementItemChildComponent } from './categories-management-item-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoriesManagementItemChildComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CategoriesManagementItemChildComponent]
})
export class CategoriesManagementItemChildModule { }
