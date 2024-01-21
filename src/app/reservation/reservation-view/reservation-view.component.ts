import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationWithAccommodation } from '../model/reservationWithAccommodation';
import { Accommodation, DateRange } from '../../accommodation/model/accommodation';
import { AxiosService } from '../../axios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrl: './reservation-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ReservationViewComponent {
  auth: AxiosService;

  @Input() reservationWithAccommodation: ReservationWithAccommodation = new ReservationWithAccommodation(0, "", new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, ""), new Date(), 0, 0, 0, "Waiting");
  @Output() acceptReservationEvent = new EventEmitter();
  @Output() declineReservationEvent = new EventEmitter();
  @Output() cancelReservationEvent = new EventEmitter();

  cancelledReservations = 0;
  cancellationDeadline = new Date();
  showCancelButton = true;

  constructor(private axiosService: AxiosService, public datePipe: DatePipe) {
    this.auth = axiosService;
  }

  ngOnInit(): void {
    let query = "?guestEmail=" + this.reservationWithAccommodation.guestEmail + "&status=Cancelled";

    this.cancellationDeadline = new Date(this.reservationWithAccommodation.date);
    this.cancellationDeadline.setDate(new Date(this.reservationWithAccommodation.date).getDate() - this.reservationWithAccommodation.accommodation.reservationCancellationDeadline);
    
    if (this.cancellationDeadline < new Date())
      this.showCancelButton = false;

    this.axiosService.request(
      "GET",
      "/api/accommodations/reservations" + query,
      {}
    ).then(
      response => {
        this.cancelledReservations = response.data.length;
      });
  }
}
