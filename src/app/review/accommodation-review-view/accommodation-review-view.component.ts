import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationReview } from '../../accommodation/model/accommodationReview';
import { AxiosService } from '../../axios.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accommodation-review-view',
  templateUrl: './accommodation-review-view.component.html',
  styleUrl: './accommodation-review-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [DatePipe]
})
export class AccommodationReviewViewComponent {
  auth: AxiosService;

  @Input() accommodationReview: AccommodationReview = new AccommodationReview(0, "", 0, "", "", false, new Date());
  @Output() approveReviewEvent = new EventEmitter();
  @Output() deleteReviewEvent = new EventEmitter();
  @Output() deleteReviewGuestEvent = new EventEmitter();

  constructor(private axiosService: AxiosService, public datePipe: DatePipe) {
    this.auth = axiosService;
  }

}
