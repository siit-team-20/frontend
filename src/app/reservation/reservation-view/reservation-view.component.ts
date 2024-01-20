import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReservationWithAccommodation } from '../model/reservationWithAccommodation';
import { Accommodation, DateRange } from '../../accommodation/model/accommodation';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrl: './reservation-view.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class ReservationViewComponent {
  auth: AxiosService;

  @Input() reservationWithAccommodation: ReservationWithAccommodation = new ReservationWithAccommodation(0, "", new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, ""), new Date(), 0, 0, 0, "Waiting");

  constructor(private axiosService: AxiosService, public datePipe: DatePipe) {
    this.auth = axiosService;
  }

}
