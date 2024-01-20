import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SearchReservationPipe } from './search-reservation.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    ReservationViewComponent,
    ReservationsComponent,
    SearchReservationPipe
  ]
})
export class ReservationModule { }
