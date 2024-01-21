import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationReviewViewComponent } from './accommodation-review-view/accommodation-review-view.component';
import { AccommodationReviewsComponent } from './accommodation-reviews/accommodation-reviews.component';
import { OwnerReviewViewComponent } from './owner-review-view/owner-review-view.component';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportsComponent } from './reports/reports.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccommodationReviewViewComponent,
    AccommodationReviewsComponent,
    OwnerReviewViewComponent,
    OwnerReviewsComponent,
    ReportViewComponent,
    ReportsComponent
  ]
})
export class ReviewModule { }
