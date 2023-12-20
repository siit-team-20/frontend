import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../model/accommodation';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationViewComponent]
})
export class AccommodationsComponent {

  accommodations: Accommodation[] = [];
  constructor(private http: HttpClient, private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/api/accommodations",
      {}
      ).then(
      response => {
          this.accommodations = response.data;
      });
  }
  searchText = '';

}
