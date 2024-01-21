import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationReview } from '../../accommodation/model/accommodationReview';
import { AxiosService } from '../../axios.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accommodation-review-view',
  templateUrl: './accommodation-review-view.component.html',
  styleUrl: './accommodation-review-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AccommodationReviewViewComponent {
  auth: AxiosService;

  @Input() accommodationReview: AccommodationReview = new AccommodationReview(0, "", 0, "", "", false);
  @Output() approveReviewEvent = new EventEmitter();
  @Output() deleteReviewEvent = new EventEmitter();

  constructor(private axiosService: AxiosService) {
    this.auth = axiosService;
  }

}
