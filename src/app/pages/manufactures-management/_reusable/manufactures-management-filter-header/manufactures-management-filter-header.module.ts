import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManufacturesManagementFilterHeaderComponent } from './manufactures-management-filter-header.component';



@NgModule({
  declarations: [
    ManufacturesManagementFilterHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ManufacturesManagementFilterHeaderComponent]
})
export class ManufacturesManagementFilterHeaderModule { }
