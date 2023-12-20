import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { NavbarModule } from './navbar/navbar.module';
import { AccommodationRequestModule } from './accommodation-request/accommodation-request.module';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';
import { AccommodationModule } from './accommodation/accommodation.module';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccommodationCreateComponent,
    NavbarModule,
    AccommodationRequestModule,
    AccommodationModule,
    AccommodationUpdateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
