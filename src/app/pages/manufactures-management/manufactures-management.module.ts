import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturesManagementComponent } from './manufactures-management.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ManufacturesManagementRoutingModule } from './manufactures-management-routing.module';
import { ManufacturesManagementFilterHeaderModule } from './_reusable/manufactures-management-filter-header/manufactures-management-filter-header.module';
import { ManufacturesManagementTableViewModule } from './_reusable/manufactures-management-table-view/manufactures-management-table-view.module';
import { ManufacturesManagementItemModule } from './_reusable/manufactures-management-item/manufactures-management-item.module';


@NgModule({
  declarations: [
    ManufacturesManagementComponent
  ],
  imports: [
    CommonModule,
    ManufacturesManagementTableViewModule,
    ManufacturesManagementFilterHeaderModule,
    ManufacturesManagementItemModule,
    ManufacturesManagementRoutingModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [ManufacturesManagementComponent]
})
export class ManufacturesManagementModule { }
