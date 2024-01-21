import { Component } from '@angular/core';
import { AccommodationReviewViewComponent } from '../accommodation-review-view/accommodation-review-view.component';
import { CommonModule } from '@angular/common';
import { AccommodationReview } from '../../accommodation/model/accommodationReview';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { UserType } from '../../auth/model/user';

@Component({
  selector: 'app-accommodation-reviews',
  templateUrl: './accommodation-reviews.component.html',
  styleUrl: './accommodation-reviews.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationReviewViewComponent]
})
export class AccommodationReviewsComponent {

  accommodationReviews: AccommodationReview[] = [];
  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Admin)
      query = "?onlyNotApproved=true";

    this.axiosService.request(
      "GET",
      "/api/accommodations/reviews" + query,
      {}
    ).then(
      response => {
        this.accommodationReviews = response.data;
        console.log(this.accommodationReviews)
      });
  }

  approveReview(review: any): void {
    let rew = review["review"];
    let updatedReview = new AccommodationReview(rew.id, rew.guestEmail, rew.accommodationId, rew.comment, rew.rating, true, rew.submitDate);
    this.axiosService.request(
      "PUT",
      "/api/accommodations/reviews/" + updatedReview.id,
      updatedReview
    ).then(
      response => {
        let query: string = "";
        if (this.axiosService.getRole() == UserType.Admin)
          query = "?onlyNotApproved=true";
        this.axiosService.request(
          "GET",
          "/api/accommodations/reviews" + query,
          {}
        ).then(
          response => {
            this.accommodationReviews = response.data;
          });
      });
  }

  deleteReview(review: any): void {
    let rew = review["review"];
    this.axiosService.request(
      "DELETE",
      "/api/accommodations/reviews/" + rew.id,
      {}
    ).then(
      response => {
        let query: string = "";
        if (this.axiosService.getRole() == UserType.Admin)
          query = "?onlyNotApproved=true";
        this.axiosService.request(
          "GET",
          "/api/accommodations/reviews" + query,
          {}
        ).then(
          response => {
            this.accommodationReviews = response.data;
          });
      });
  }
}
