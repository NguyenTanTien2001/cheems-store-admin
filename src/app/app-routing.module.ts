import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsManagementComponent } from './pages/products-management/products-management.component';
import { AuthGuard } from './services/security/auth.guard';
import { LayoutComponent } from './theme/layout/layout.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '', component: LayoutComponent,
    pathMatch: 'full',
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'products', component: LayoutComponent,
    loadChildren: () => import('src/app/pages/products-management/products-management.module').then(
      (m) => m.ProductsManagementModule
    ),

  },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    // enableTracing: true
    // initialNavigation: 'enabledNonBlocking'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
