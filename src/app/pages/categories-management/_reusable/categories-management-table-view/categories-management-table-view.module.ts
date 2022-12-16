import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesManagementTableViewComponent } from './categories-management-table-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'src/app/components/framework/_components/pagination/pagination.module';
import { TaigaUIModule } from 'src/app/components/tai-ga/taiga.module';



@NgModule({
  declarations: [
    CategoriesManagementTableViewComponent
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
  exports: [CategoriesManagementTableViewComponent]
})
export class CategoriesManagementTableViewModule { }
