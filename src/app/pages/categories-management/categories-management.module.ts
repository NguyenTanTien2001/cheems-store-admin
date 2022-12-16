import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesManagementComponent } from './categories-management.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoriesManagementRoutingModule } from './categories-management-routing.module';
import { CategoriesManagementFilterHeaderModule } from './_reusable/categories-management-filter-header/categories-management-filter-header.module';
import { CategoriesManagementTableViewModule } from './_reusable/categories-management-table-view/categories-management-table-view.module';
import { CategoriesManagementItemModule } from './_reusable/categories-management-item/categories-management-item.module';



@NgModule({
  declarations: [
    CategoriesManagementComponent
  ],
  imports: [
    CommonModule,
    CategoriesManagementTableViewModule,
    CategoriesManagementFilterHeaderModule,
    CategoriesManagementItemModule,
    CategoriesManagementRoutingModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [CategoriesManagementComponent]
})
export class CategoriesManagementModule { }
