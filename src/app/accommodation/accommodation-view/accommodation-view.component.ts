import { Component, Input, Output } from '@angular/core';
import { Accommodation } from '../model/accommodation';
import { EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrl: './accommodation-view.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class AccommodationViewComponent {

  @Input() accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Date(), new Date(), "", 0, 0);
  @Output() updateItemEvent = new EventEmitter();

}
