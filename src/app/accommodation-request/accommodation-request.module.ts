import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AccommodationRequestViewComponent } from './accommodation-request-view/accommodation-request-view.component';
import { AccommodationRequestsComponent } from './accommodation-requests/accommodation-requests.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AccommodationRequestViewComponent,
    AccommodationRequestsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class AccommodationRequestModule { }
