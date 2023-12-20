import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    LoginComponent,
    CommonModule
  ]
})
export class AuthModule { }
