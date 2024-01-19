import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AccommodationRequest } from '../model/accommodation-request';
import { Accommodation, DateRange } from '../../accommodation/model/accommodation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation-request-view',
  templateUrl: './accommodation-request-view.component.html',
  styleUrl: './accommodation-request-view.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class AccommodationRequestViewComponent {
  @Input() accommodationRequest: AccommodationRequest = new AccommodationRequest(0, null, new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, ""), "Created");
  @Output() rejectCreateRequestEvent = new EventEmitter();
  @Output() approveCreateRequestEvent = new EventEmitter();
  @Output() approveUpdateRequestEvent = new EventEmitter();
  @Output() rejectUpdateRequestEvent = new EventEmitter();
}
