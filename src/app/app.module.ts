import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from "./theme/layout/layout.module";
import { AuthService } from "./services/auth/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginModule } from "./pages/auth/login/login.module";
import { AuthGuard } from "./services/security/auth.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,

    LayoutModule,
    ReactiveFormsModule,
    FormsModule,

    LoginModule,

    CommonModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule
],
  providers: [
    Title,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
