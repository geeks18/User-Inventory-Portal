import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';

import { ProfileComponent } from './components/profile/profile.component';
import { MatTableModule } from  '@angular/material';

import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import {AmplifyAngularModule,AmplifyService} from 'aws-amplify-angular';
Amplify.configure(aws_exports)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    InventoryComponent,
    RegisterComponent,
    ForgotPwdComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
  HttpClientModule,
  ReactiveFormsModule,
  AmplifyAngularModule,
    RouterModule.forRoot([
      {
        path: 'inventory',
        component: InventoryComponent
      },
	   {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
       {
        path: 'forgotPassword',
        component: ForgotPwdComponent
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '' }
	  
    ])
  ],
  providers: [AuthService,AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
