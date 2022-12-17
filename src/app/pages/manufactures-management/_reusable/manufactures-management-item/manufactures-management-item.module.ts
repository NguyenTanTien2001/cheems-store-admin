import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturesManagementItemComponent } from './manufactures-management-item.component';
import { ManufacturesManagementItemChildModule } from './_reusable/manufactures-management-item-child/manufactures-management-item-child.module';


@NgModule({
  declarations: [
    ManufacturesManagementItemComponent
  ],
  imports: [
    CommonModule,
    ManufacturesManagementItemChildModule
  ],
  exports: [ManufacturesManagementItemComponent]
})
export class ManufacturesManagementItemModule { }
