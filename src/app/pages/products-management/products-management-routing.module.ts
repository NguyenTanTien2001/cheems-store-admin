import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsManagementComponent } from "./products-management.component";
import { ProductsManagementItemComponent } from "./_reusable/products-management-item/products-management-item.component";

export const routes: Routes = [
  {
      path: '', component: ProductsManagementComponent
  },
  {
    path: 'item/:identifier',
    component: ProductsManagementItemComponent,
  },
  {
    path: 'item',
    component: ProductsManagementItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule {}

