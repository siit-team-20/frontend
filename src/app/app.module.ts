import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { NavbarModule } from './navbar/navbar.module';
import { AccommodationRequestModule } from './accommodation-request/accommodation-request.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccommodationCreateComponent
    NavbarModule,
    AccommodationRequestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
