import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesManagementComponent } from "./categories-management.component";
import { CategoriesManagementItemComponent } from "./_reusable/categories-management-item/categories-management-item.component";
export const routes: Routes = [
  {
      path: '', component: CategoriesManagementComponent
  },
  {
    path: 'item/:identifier',
    component: CategoriesManagementItemComponent,
  },
  {
    path: 'item',
    component: CategoriesManagementItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesManagementRoutingModule {}

