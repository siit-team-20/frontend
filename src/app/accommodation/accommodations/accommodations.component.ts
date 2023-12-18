import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../model/accommodation';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationViewComponent]
})
export class AccommodationsComponent {

  accommodations: Accommodation[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Accommodation[]>(
      "http://localhost:8080/api/accommodations"
    ).subscribe(data => this.accommodations = data);
  }

}
