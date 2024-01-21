import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationReviewViewComponent } from './accommodation-review-view/accommodation-review-view.component';
import { AccommodationReviewsComponent } from './accommodation-reviews/accommodation-reviews.component';
import { OwnerReviewViewComponent } from './owner-review-view/owner-review-view.component';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccommodationReviewViewComponent,
    AccommodationReviewsComponent,
    OwnerReviewViewComponent,
    OwnerReviewsComponent
  ]
})
export class ReviewModule { }
