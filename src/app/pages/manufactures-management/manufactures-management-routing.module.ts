import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManufacturesManagementComponent } from "./manufactures-management.component";
import { ManufacturesManagementItemComponent } from "./_reusable/manufactures-management-item/manufactures-management-item.component";

export const routes: Routes = [
  {
      path: '', component: ManufacturesManagementComponent
  },
  {
    path: 'item/:identifier',
    component: ManufacturesManagementItemComponent,
  },
  {
    path: 'item',
    component: ManufacturesManagementItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturesManagementRoutingModule {}

