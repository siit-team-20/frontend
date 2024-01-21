import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User, UserType } from '../../auth/model/user';
import { OwnerReview } from '../../accommodation/model/ownerReview';
import { OwnerReviewViewComponent } from '../../review/owner-review-view/owner-review-view.component';
import { Report } from '../../auth/model/report';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, OwnerReviewViewComponent]
})
export class ProfileViewComponent {

  auth: AxiosService;
  route: ActivatedRoute = inject(ActivatedRoute);
  profileEmail = "";
  user: User = new User("", "", "", "", "", "", UserType.Guest);

  ownerReviews: OwnerReview[] = [];

  constructor(private axiosService: AxiosService, private router: Router) {
    this.auth = axiosService;
    this.profileEmail = this.route.snapshot.params["email"];
  }

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/users/" + this.profileEmail,
      {}
    ).then(
      response => {
        this.user = response.data;

        let query = "?ownerEmail=" + this.user.email + "&isReported=false";
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

  deleteUser() {
    this.auth.request(
      "DELETE",
      "/account/" + this.auth.getEmail(),
      {}
    ).then(
      response => {
        this.router.navigate(['/']);
        this.axiosService.setAuthToken(null);
      });
  }

  reportUser(): void {

    const report = new Report(null, this.auth.getEmail(), this.profileEmail);

    this.axiosService.request(
      "POST",
      "/api/reports",
      report
    )
  }

  // Owner reportuje Guesta
  reportReview(review: any): void {
    let rew = review["review"];
    let updatedReview = new OwnerReview(rew.id, rew.guestEmail, rew.ownerEmail, rew.comment, rew.rating, true);
    this.axiosService.request(
      "PUT",
      "/api/ownerReviews/" + updatedReview.id,
      updatedReview
    ).then(
      response => {

        let query = "?ownerEmail=" + this.user.email + "&isReported=false";

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

  // Guest brise svoj review
  deleteReviewGuest(review: any): void {
    let rew = review["review"];
    this.axiosService.request(
      "DELETE",
      "/api/ownerReviews/" + rew.id,
      {}
    ).then(
      response => {

        let query = "?ownerEmail=" + this.user.email + "&isReported=false";

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
