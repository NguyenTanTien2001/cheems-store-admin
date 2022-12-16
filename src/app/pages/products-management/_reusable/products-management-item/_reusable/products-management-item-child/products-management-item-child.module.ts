import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementItemChildComponent } from './products-management-item-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TuiRootModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiFilesModule, TuiInputFilesModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableModule } from 'src/app/components/framework/_page/_tables/sortable/sortable.module';
import { TaigaUIModule } from 'src/app/components/tai-ga/taiga.module';



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
    NgbModule,
    NgbdSortableModule,
    TaigaUIModule,
    TuiInputFilesModule,
    TuiFilesModule,
    DragDropModule
  ],
  exports: [ProductsManagementItemChildComponent]
})
export class ProductsManagementItemChildModule { }
