import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManufacturesManagementItemChildComponent } from './manufactures-management-item-child.component';



@NgModule({
  declarations: [
    ManufacturesManagementItemChildComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ManufacturesManagementItemChildComponent]
})
export class ManufacturesManagementItemChildModule { }
