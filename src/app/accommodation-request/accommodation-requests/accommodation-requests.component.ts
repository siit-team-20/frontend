import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationRequest } from '../model/accommodation-request';
import { AccommodationRequestViewComponent } from '../accommodation-request-view/accommodation-request-view.component';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodation-requests',
  templateUrl: './accommodation-requests.component.html',
  styleUrl: './accommodation-requests.component.css',
  standalone: true,
  imports: [AccommodationRequestViewComponent, CommonModule]
})
export class AccommodationRequestsComponent {

  accommodationRequests: AccommodationRequest[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/api/accommodations/requests",
      {}
      ).then(
      response => {
          this.accommodationRequests = response.data;
      });
  }

  rejectCreateRequest(ids: any): void {

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/requests/"+ids.accommodationRequestId,
      {}
      ).then(
      response => {
        this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId)
      });

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/"+ids.accommodationId,
      {}
      );

  }

  approveCreateRequest(ids: any): void {

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/requests/"+ids.accommodationRequestId,
      {}
      ).then(
      response => {
        this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId)
      });

    ids.accommodation.isApproved = true;

    this.axiosService.request(
      "PUT",
      "/api/accommodations/"+ids.accommodation.id,
      ids.accommodation
      );

  }

  rejectUpdateRequest(ids: any): void {

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/requests/"+ids.accommodationRequestId,
      {}
      ).then(
      response => {
        this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId)
      });

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/"+ids.newAccommodation.id,
      {}
      );

    ids.oldAccommodation.isApproved = true;

    this.axiosService.request(
      "PUT",
      "/api/accommodations/"+ids.oldAccommodation.id,
      ids.oldAccommodation
      );

  }

  approveUpdateRequest(ids: any): void {

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/requests/"+ids.accommodationRequestId,
      {}
      ).then(
      response => {
        this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId)
      });

    this.axiosService.request(
      "DELETE",
      "/api/accommodations/"+ids.oldAccommodation.id,
      {}
      );

    ids.newAccommodation.isApproved = true;

    this.axiosService.request(
      "PUT",
      "/api/accommodations/"+ids.newAccommodation.id,
      ids.newAccommodation
      );
  }

}
