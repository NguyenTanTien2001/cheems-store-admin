import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementItemChildComponent } from './products-management-item-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TuiRootModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiMultiSelectModule } from '@taiga-ui/kit';



@NgModule({
  declarations: [
    ProductsManagementItemChildComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    NgSelectModule,

  ],
  exports: [ProductsManagementItemChildComponent]
})
export class ProductsManagementItemChildModule { }
