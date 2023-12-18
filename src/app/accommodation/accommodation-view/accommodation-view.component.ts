import { Component, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrl: './accommodation-view.component.css',
  standalone: true
})
export class AccommodationViewComponent {

  @Input() accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Date(), new Date(), "", 0, 0);

}
