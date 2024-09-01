import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { OwnerNavbarComponent } from './owner-navbar/owner-navbar.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    AdminNavbarComponent,
    OwnerNavbarComponent,
    GuestNavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
