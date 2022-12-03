import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementTableViewComponent } from './products-management-table-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaigaUIModule } from 'src/app/components/tai-ga/taiga.module';
import { PaginationModule } from 'src/app/components/framework/_components/pagination/pagination.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProductsManagementTableViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaigaUIModule,
    PaginationModule,
    NgSelectModule,
    MatIconModule
  ],
  exports: [ProductsManagementTableViewComponent]
})
export class ProductsManagementTableViewModule { }
