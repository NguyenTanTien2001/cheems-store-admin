import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesManagementItemComponent } from './categories-management-item.component';
import { CategoriesManagementItemChildModule } from './_reusable/categories-management-item-child/categories-management-item-child.module';



@NgModule({
  declarations: [
    CategoriesManagementItemComponent
  ],
  imports: [
    CommonModule,
    CategoriesManagementItemChildModule
  ],
  exports: [CategoriesManagementItemComponent]
})
export class CategoriesManagementItemModule { }
