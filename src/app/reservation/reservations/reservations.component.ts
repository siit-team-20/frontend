import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationViewComponent } from '../reservation-view/reservation-view.component';
import { ReservationWithAccommodation } from '../model/reservationWithAccommodation';
import { AxiosService } from '../../axios.service';
import { UserType } from '../../auth/model/user';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  standalone: true,
  imports: [CommonModule, ReservationViewComponent]
})
export class ReservationsComponent {

  reservationWithAccommodations: ReservationWithAccommodation[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Guest)
      query = "?guestEmail=" + this.axiosService.getUser()["sub"];

    this.axiosService.request(
      "GET",
      "/api/accommodations/reservations",
      {}
    ).then(
      response => {
        this.reservationWithAccommodations = response.data;
      });
  }

  acceptReservation(ids: any): void {


  }

  declineReservation(ids: any): void {


  }

  cancelReservation(ids: any): void {


  }

}
