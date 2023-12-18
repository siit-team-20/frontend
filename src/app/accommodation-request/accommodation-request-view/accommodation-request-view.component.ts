import { Component, Input } from '@angular/core';
import { AccommodationRequest } from './model/accommodation-request';
import { Accommodation } from '../../accommodation/accommodation';

@Component({
  selector: 'app-accommodation-request-view',
  templateUrl: './accommodation-request-view.component.html',
  styleUrl: './accommodation-request-view.component.css',
  standalone: true
})
export class AccommodationRequestViewComponent {
  @Input() accommodationRequest: AccommodationRequest = new AccommodationRequest(0, null, new Accommodation(0, "", "", "", "", 0, 0, "", new Array<string>(), new Date(), new Date(), false, false, 0, new Date(), new Array<string>()), "");
}
