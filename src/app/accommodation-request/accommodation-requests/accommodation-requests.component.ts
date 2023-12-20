import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationRequest } from '../model/accommodation-request';
import { AccommodationRequestViewComponent } from '../accommodation-request-view/accommodation-request-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation-requests',
  templateUrl: './accommodation-requests.component.html',
  styleUrl: './accommodation-requests.component.css',
  standalone: true,
  imports: [AccommodationRequestViewComponent, CommonModule]
})
export class AccommodationRequestsComponent {

  accommodationRequests: AccommodationRequest[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<AccommodationRequest[]>(
      "http://localhost:8080/api/accommodations/requests"
    ).subscribe(data => this.accommodationRequests = data);
  }

  rejectCreateRequest(ids: any): void {
    this.http.delete(
      "http://localhost:8080/api/accommodations/requests/" + ids.accommodationRequestId,
    ).subscribe(data => this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId));
    this.http.delete(
      "http://localhost:8080/api/accommodations/" + ids.accommodationId,
    ).subscribe();
  }

  approveCreateRequest(ids: any): void {
    this.http.delete(
      "http://localhost:8080/api/accommodations/requests/" + ids.accommodationRequestId,
    ).subscribe(data => this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId));
    ids.accommodation.isApproved = true;
    this.http.put(
      "http://localhost:8080/api/accommodations/" + ids.accommodation.id,
      ids.accommodation,
      ids.accommodation.id
    ).subscribe();
  }

  rejectUpdateRequest(ids: any): void {
    this.http.delete(
      "http://localhost:8080/api/accommodations/requests/" + ids.accommodationRequestId,
    ).subscribe(data => this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId));
    this.http.delete(
      "http://localhost:8080/api/accommodations/" + ids.accommodationId,
    ).subscribe();
  }

  approveUpdateRequest(ids: any): void {
    this.http.delete(
      "http://localhost:8080/api/accommodations/requests/" + ids.accommodationRequestId,
    ).subscribe(data => this.accommodationRequests = this.accommodationRequests.filter((accommodationRequest: AccommodationRequest) => accommodationRequest.id != ids.accommodationRequestId));
    ids.accommodation.isApproved = true;
    this.http.put(
      "http://localhost:8080/api/accommodations/" + ids.accommodation.id,
      ids.accommodation,
      ids.accommodation.id
    ).subscribe();
  }

}
