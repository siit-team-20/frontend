import { Component, Input, Output } from '@angular/core';
import { Accommodation, DateRange } from '../model/accommodation';
import { EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AxiosService } from '../../axios.service';
import { AccommodationReview } from '../model/accommodationReview';
import { FavouriteAccommodation } from '../model/favouriteAccommodation';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrl: './accommodation-view.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class AccommodationViewComponent {

  auth: AxiosService;
  averageRating = 0;
  accommodationReviews: AccommodationReview[] = [];

  @Input() accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, "");
  @Output() updateItemEvent = new EventEmitter();
  @Output() addToFavouritesEvent = new EventEmitter();

  constructor(private axiosService: AxiosService, public router: Router) {
    this.auth = axiosService;
  }

  ngOnInit(): void {

    let query: string = "";
    query = "?accommodationId=" + this.accommodation.id + "&onlyNotApproved=false";
    this.axiosService.request(
      "GET",
      "/api/accommodations/reviews" + query,
      {}
    ).then(
      response => {
        this.accommodationReviews = response.data;
        var sum = 0;
        for (let i = 0; i < this.accommodationReviews.length; i++) {
          if (this.accommodationReviews[i].rating == 'one') {
            sum += 1;
          }
          else if (this.accommodationReviews[i].rating == 'two') {
            sum += 2;
          }
          else if (this.accommodationReviews[i].rating == 'three') {
            sum += 3;
          }
          else if (this.accommodationReviews[i].rating == 'four') {
            sum += 4;
          }
          else {
            sum += 5;
          }
          this.averageRating = sum / this.accommodationReviews.length;
        }
      });


  }

}
