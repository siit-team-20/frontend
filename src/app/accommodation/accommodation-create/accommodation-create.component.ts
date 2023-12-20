import { Component, EventEmitter, Output } from '@angular/core';
import { Accommodation, AccommodationTypeMapping, AccommodationType } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AccommodationRequest } from '../../accommodation-request/model/accommodation-request';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrl: './accommodation-create.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})

export class AccommodationCreateComponent {
  public accommodationTypeMapping = AccommodationTypeMapping;
  public accommodationTypes = Object.values(AccommodationType);
  typeSelect = this.accommodationTypeMapping[this.accommodationTypes[0]];
  pricing = "perGuest";

  @Output() newDataEvent = new EventEmitter();

  createForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private axiosService: AxiosService) {

    this.createForm = this.formBuilder.group({
      ownerEmail: ["", Validators.compose([Validators.required, Validators.email])],
      name: ["", [Validators.required]],
      location: ["", [Validators.required]],
      description: ["", [Validators.required]],
      minGuests: [, Validators.compose([Validators.required, Validators.min(1)])],
      maxGuests: [, Validators.compose([Validators.required, Validators.min(1)])],
      accommodationType: [this.typeSelect, [Validators.required]],
      benefits: ["", [Validators.required]],
      availabilityStart: [new Date(), [Validators.required]],
      availabilityEnd: [new Date(), [Validators.required]],
      price: [, Validators.compose([Validators.required, Validators.min(1)])],
      pricing: [this.pricing, [Validators.required]],
      reservationCancellationDeadline: [, Validators.compose([Validators.required, Validators.min(1)])],
    });

  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {

      const submitData = { ...this.createForm.value };
      const accommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, submitData.availabilityStart!, submitData.availabilityEnd!, submitData.pricing!, submitData.price!, submitData.reservationCancellationDeadline!);
      
      this.axiosService.request(
		    "POST",
		    "/api/accommodations",
		    accommodation
        ).then(
		    response => {
            const accommodationRequest = new AccommodationRequest(null, null, response.data as Accommodation, "Created");
            this.axiosService.request(
              "POST",
              "/api/accommodations/requests",
              accommodationRequest
            )
		    });
      }
    form.classList.add('was-validated');

  }
}
