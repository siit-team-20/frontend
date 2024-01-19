import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';
import { ReservationsComponent } from './reservations/reservations.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReservationViewComponent,
    ReservationsComponent
  ]
})
export class ReservationModule { }
