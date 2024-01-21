import { Component, Input, EventEmitter, Output, inject } from '@angular/core';
import { AccommodationRequest } from '../model/accommodation-request';
import { Accommodation, DateRange } from '../../accommodation/model/accommodation';
import { CommonModule, DatePipe } from '@angular/common';
import { AxiosService } from '../../axios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accommodation-request-view',
  templateUrl: './accommodation-request-view.component.html',
  styleUrl: './accommodation-request-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AccommodationRequestViewComponent {
  @Input() accommodationRequest: AccommodationRequest = new AccommodationRequest(0, null, new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, ""), "Created");
  @Output() rejectCreateRequestEvent = new EventEmitter();
  @Output() approveCreateRequestEvent = new EventEmitter();
  @Output() approveUpdateRequestEvent = new EventEmitter();
  @Output() rejectUpdateRequestEvent = new EventEmitter();

  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;
  reservationForm: FormGroup;


  constructor(private axiosService: AxiosService, private router: Router, private formBuilder: FormBuilder, public datePipe: DatePipe){
    this.accommodationId = Number(this.route.snapshot.params['id']);
    this.reservationForm = this.formBuilder.group({

      availabilityStart: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      availabilityEnd: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]]
    });

  }
}
