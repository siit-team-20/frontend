import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OwnerReviewViewComponent } from '../owner-review-view/owner-review-view.component';
import { OwnerReview } from '../../accommodation/model/ownerReview';
import { AxiosService } from '../../axios.service';
import { Route, Router } from '@angular/router';
import { UserType } from '../../auth/model/user';

@Component({
  selector: 'app-owner-reviews',
  templateUrl: './owner-reviews.component.html',
  styleUrl: './owner-reviews.component.css',
  standalone: true,
  imports: [CommonModule, OwnerReviewViewComponent]
})
export class OwnerReviewsComponent {

  ownerReviews: OwnerReview[] = [];
  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Admin)
      query = "?isReported=true";

    this.axiosService.request(
      "GET",
      "/api/ownerReviews" + query,
      {}
    ).then(
      response => {
        this.ownerReviews = response.data;
      });
  }

  // Admin odobrava neki reportovani review
  approveReview(review: any): void {
    let rew = review["review"];
    let updatedReview = new OwnerReview(rew.id, rew.guestEmail, rew.ownerEmail, rew.comment, rew.rating, false, rew.submitDate);
    this.axiosService.request(
      "PUT",
      "/api/ownerReviews/" + updatedReview.id,
      updatedReview
    ).then(
      response => {
        let query: string = "";
        if (this.axiosService.getRole() == UserType.Admin)
          query = "?isReported=true";
        this.axiosService.request(
          "GET",
          "/api/ownerReviews" + query,
          {}
        ).then(
          response => {
            this.ownerReviews = response.data;
          });
      });
  }

  // Admin brise neki reportovani review
  deleteReview(review: any): void {
    let rew = review["review"];
    this.axiosService.request(
      "DELETE",
      "/api/ownerReviews/" + rew.id,
      {}
    ).then(
      response => {
        let query: string = "";
        if (this.axiosService.getRole() == UserType.Admin)
          query = "?isReported=true";
        this.axiosService.request(
          "GET",
          "/api/ownerReviews" + query,
          {}
        ).then(
          response => {
            this.ownerReviews = response.data;
          });
      });
  }

}
