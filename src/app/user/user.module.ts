import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
