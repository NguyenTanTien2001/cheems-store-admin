import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'src/app/components/framework/_components/pagination/pagination.module';
import { TaigaUIModule } from 'src/app/components/tai-ga/taiga.module';
import { ManufacturesManagementTableViewComponent } from './manufactures-management-table-view.component';



@NgModule({
  declarations: [
    ManufacturesManagementTableViewComponent
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
  exports: [ManufacturesManagementTableViewComponent]
})
export class ManufacturesManagementTableViewModule { }
