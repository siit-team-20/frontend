import { Component, Input, Output } from '@angular/core';
import { Accommodation, DateRange } from '../model/accommodation';
import { EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrl: './accommodation-view.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class AccommodationViewComponent {
  auth: AxiosService;

  @Input() accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, "");
  @Output() updateItemEvent = new EventEmitter();

  constructor(private axiosService: AxiosService) {
    this.auth = axiosService;
  }

}
