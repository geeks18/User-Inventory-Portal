

import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import {DataService} from './service/data.service';
import {AddDialogComponent} from './components/inventory/dialogs/add/add.dialog.component';
import {EditDialogComponent} from './components/inventory/dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './components/inventory/dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';



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
    HomeComponent,
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
  HttpClientModule,
  ReactiveFormsModule,
  AmplifyAngularModule,

  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  MatDialogModule,
  FormsModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
  ReactiveFormsModule,
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
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [AuthService,AmplifyService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
