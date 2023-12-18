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

}
