import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationViewComponent } from '../reservation-view/reservation-view.component';
import { ReservationWithAccommodation } from '../model/reservationWithAccommodation';
import { AxiosService } from '../../axios.service';
import { UserType } from '../../auth/model/user';
import { SearchPipe } from '../../accommodation/search.pipe';
import { FormsModule } from '@angular/forms';
import { SearchReservationPipe } from '../search-reservation.pipe';
import { Reservation, ReservationStatus } from '../model/reservation';
import { Notification, NotificationType } from '../../navbar/model/notification';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  standalone: true,
  imports: [CommonModule, ReservationViewComponent,FormsModule, SearchReservationPipe]
})
export class ReservationsComponent {

  reservationWithAccommodations: ReservationWithAccommodation[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Guest)
      query = "?guestEmail=" + this.axiosService.getUser()["sub"];
    
    if (this.axiosService.getRole() == UserType.Owner)
      query = "?ownerEmail=" + this.axiosService.getUser()["sub"];

    this.axiosService.request(
      "GET",
      "/api/accommodations/reservations" + query,
      {}
    ).then(
      response => {
        this.reservationWithAccommodations = response.data;
      });
  }

      searchtext: string  = '';
      searchstatus: string ='';
      searchstartdate: string='';
      searchenddate: string='';

  acceptReservation(reservation: any): void {
    let res = reservation["reservation"];
    let updatedReservation = new Reservation(res.id, res.guestEmail, res.accommodation.id, res.date, res.days, res.guestNumber, res.price, ReservationStatus.Approved);
    this.axiosService.request(
    "PUT",
    "/api/accommodations/reservations/"+updatedReservation.id,
    updatedReservation
    ).then(
    response => {
      this.axiosService.request(
        "GET",
        "/api/accommodations/reservations",
        {}
      ).then(
        response => {
          this.reservationWithAccommodations = response.data;
        });
    });
  }

  declineReservation(reservation: any): void {
    let res = reservation["reservation"];
    let updatedReservation = new Reservation(res.id, res.guestEmail, res.accommodation.id, res.date, res.days, res.guestNumber, res.price, ReservationStatus.Rejected);
    this.axiosService.request(
    "PUT",
    "/api/accommodations/reservations/"+updatedReservation.id,
    updatedReservation
    ).then(
    response => {
      this.axiosService.request(
        "GET",
        "/api/accommodations/reservations",
        {}
      ).then(
        response => {
          this.reservationWithAccommodations = response.data;
        });
    });
  }

  cancelReservation(reservation: any): void {
    let res = reservation["reservation"];
    let updatedReservation = new Reservation(res.id, res.guestEmail, res.accommodation.id, res.date, res.days, res.guestNumber, res.price, ReservationStatus.Canceled);
    this.axiosService.request(
    "PUT",
    "/api/accommodations/reservations/"+updatedReservation.id,
    updatedReservation
    ).then(
    response => {
      this.axiosService.request(
        "GET",
        "/api/accommodations/reservations",
        {}
      ).then(
        response => {
          this.reservationWithAccommodations = response.data;
        });
    });

    const notification = new Notification(null, res.accommodation.ownerEmail, this.axiosService.getEmail(), NotificationType.ReservationCancelled, new Date());
      this.axiosService.request(
        "POST",
        "/api/notifications",
        notification
      );
  }

}
