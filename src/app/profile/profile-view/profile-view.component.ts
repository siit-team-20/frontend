import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User, UserType } from '../../auth/model/user';
import { OwnerReview } from '../../accommodation/model/ownerReview';
import { OwnerReviewViewComponent } from '../../review/owner-review-view/owner-review-view.component';
import { Report } from '../../auth/model/report';
import { ReservationWithAccommodation } from '../../reservation/model/reservationWithAccommodation';

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
  averageRating = 0;
  user: User = new User("", "", "", "", "", "", UserType.Guest, false);
  public deleteInvalid = "";
  canReport = false;

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

        if (this.auth.getRole() == 'Guest') {
          this.axiosService.request(
            "GET",
            "/api/accommodations/reservations?guestEmail=" + this.auth.getEmail() + "&ownerEmail=" + this.user.email + "&status=Finished",
            {}
          ).then(
            response => {
              if (response.data.length != 0)
                this.canReport = true;
            }
          );
        }

        if (this.auth.getRole() == 'Owner') {
          this.axiosService.request(
            "GET",
            "/api/accommodations/reservations?ownerEmail=" + this.auth.getEmail() + "&guestEmail=" + this.user.email + "&status=Finished",
            {}
          ).then(
            response => {
              if (response.data.length != 0)
                this.canReport = true;
            }
          );
        }

        let query = "?ownerEmail=" + this.user.email + "&isReported=false";
        this.axiosService.request(
          "GET",
          "/api/ownerReviews" + query,
          {}
        ).then(
          response => {
            this.ownerReviews = response.data;
            console.log(this.ownerReviews);
            var sum = 0;
            for (let i = 0; i < this.ownerReviews.length; i++) {
              if (this.ownerReviews[i].rating == 'one') {
                sum += 1;
              }
              else if (this.ownerReviews[i].rating == 'two') {
                sum += 2;
              }
              else if (this.ownerReviews[i].rating == 'three') {
                sum += 3;
              }
              else if (this.ownerReviews[i].rating == 'four') {
                sum += 4;
              }
              else {
                sum += 5;
              }
              this.averageRating = sum / this.ownerReviews.length;
            }
          });
      });
  }

  deleteUser() {

    let query = "";
    if (this.auth.getRole() == 'Guest') {
      query = "?guestEmail=" + this.auth.getEmail() + "&status=Approved";

      this.auth.request(
        "GET",
        "/api/accommodations/reservations" + query,
        {}
      ).then(
        response => {
          if (response.data.length == 0) {
            this.deleteInvalid = "";

            query = "?guestEmail=" + this.auth.getEmail() + "&status=Waiting";

            this.auth.request(
              "DELETE",
              "/api/accommodations/reservations" + query,
              {}
            ).then(
              response => {
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
            )
          }
          else {
            this.deleteInvalid = "You cannot delete your account because you have approved reservations!"
          }
        }
      )
    }
    else if (this.auth.getRole() == 'Owner') {
      query = "?ownerEmail=" + this.auth.getEmail() + "&status=Approved";

      this.auth.request(
        "GET",
        "/api/accommodations/reservations" + query,
        {}
      ).then(
        response => {
          if (response.data.length == 0) {
            this.deleteInvalid = "";

            query = "?ownerEmail=" + this.auth.getEmail() + "&status=Waiting";

            this.auth.request(
              "DELETE",
              "/api/accommodations/reservations" + query,
              {}
            ).then(
              response => {
                this.auth.request(
                  "DELETE",
                  "/api/accommodations?ownerEmail=" + this.auth.getEmail(),
                  {}
                ).then(
                  response => {
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
                )
              }
            )
            
          }
          else {
            this.deleteInvalid = "You cannot delete your account because you have approved reservations for your accommodations!"
          }
        }
      )
    }

  }

  reportUser(): void {

    const report = new Report(null, this.auth.getEmail(), this.profileEmail);
    console.log(report)
    this.axiosService.request(
      "POST",
      "/api/reports",
      report
    )
  }

  // Owner reportuje Guesta
  reportReview(review: any): void {
    let rew = review["review"];
    let updatedReview = new OwnerReview(rew.id, rew.guestEmail, rew.ownerEmail, rew.comment, rew.rating, true, rew.submitDate);
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
