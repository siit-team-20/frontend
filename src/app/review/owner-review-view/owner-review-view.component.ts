import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { OwnerReview } from '../../accommodation/model/ownerReview';

@Component({
  selector: 'app-owner-review-view',
  templateUrl: './owner-review-view.component.html',
  styleUrl: './owner-review-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class OwnerReviewViewComponent {

  auth: AxiosService;

  @Input() ownerReview: OwnerReview = new OwnerReview(0, "", "", "", "", false, new Date());
  @Output() approveReviewEvent = new EventEmitter();
  @Output() deleteReviewEvent = new EventEmitter();
  @Output() deleteReviewGuestEvent = new EventEmitter();
  @Output() reportReviewEvent = new EventEmitter();

  constructor(private axiosService: AxiosService, public datePipe: DatePipe) {
    this.auth = axiosService;
  }

}
