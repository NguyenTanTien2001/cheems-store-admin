import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsManagementComponent } from './products-management.component';
import { ProductsManagementTableViewModule } from './_reusable/products-management-table-view/products-management-table-view.module';
import { ProductsManagementFilterHeaderModule } from './_reusable/products-management-filter-header/products-management-filter-header.module';
import { ProductsManagementItemModule } from './_reusable/products-management-item/products-management-item.module';
import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    ProductsManagementComponent
  ],
  imports: [
    CommonModule,
    ProductsManagementTableViewModule,
    ProductsManagementFilterHeaderModule,
    ProductsManagementItemModule,
    ProductsManagementRoutingModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [ProductsManagementComponent]
})
export class ProductsManagementModule { }
