import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accommodation, AccommodationTypeMapping, AccommodationType } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequest } from '../../accommodation-request/model/accommodation-request';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrl: './accommodation-update.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class AccommodationUpdateComponent implements OnInit {

  public accommodationTypeMapping = AccommodationTypeMapping;
  public accommodationTypes = Object.values(AccommodationType);
  typeSelect = this.accommodationTypeMapping[this.accommodationTypes[0]];
  pricing = "perGuest";

  @Output() updateDataEvent = new EventEmitter();

  updateForm: FormGroup;
  oldAccommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Date(), new Date(), "", 0, 0);
  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;

  constructor(private axiosService: AxiosService, private formBuilder: FormBuilder, private router: Router) {

    this.accommodationId = Number(this.route.snapshot.params['id']);

    this.updateForm = this.formBuilder.group({
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

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/api/accommodations/"+this.accommodationId,
      {}
      ).then(
      response => {
        this.updateForm.controls["ownerEmail"].setValue(response.data.ownerEmail);
        this.updateForm.controls["name"].setValue(response.data.name);
        this.updateForm.controls["location"].setValue(response.data.location);
        this.updateForm.controls["description"].setValue(response.data.description);
        this.updateForm.controls["minGuests"].setValue(response.data.minGuests);
        this.updateForm.controls["maxGuests"].setValue(response.data.maxGuests);
        this.updateForm.controls["accommodationType"].setValue(response.data.accommodationType);
        this.updateForm.controls["benefits"].setValue(response.data.benefits.join(", "));
        const startDateArray = response.data.availabilityStart;
        const startDate = String(startDateArray[0]) + "-" + String(startDateArray[1]).padStart(2, "0") + "-" + String(startDateArray[2]).padStart(2, "0");
        const endDateArray = response.data.availabilityEnd;
        const endDate = String(endDateArray[0]) + "-" + String(endDateArray[1]).padStart(2, "0") + "-" + String(endDateArray[2]).padStart(2, "0");
        this.updateForm.controls["availabilityStart"].setValue(startDate);
        this.updateForm.controls["availabilityEnd"].setValue(endDate);
        this.updateForm.controls["price"].setValue(response.data.price);
        if (response.data.isPriceByGuest) {
          this.updateForm.controls["pricing"].setValue("perGuest");
        }
        else {
          this.updateForm.controls["pricing"].setValue("perDay");
        }
        this.updateForm.controls["reservationCancellationDeadline"].setValue(response.data.reservationCancellationDeadline);
        this.oldAccommodation = response.data;
      });
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {

      const submitData = { ...this.updateForm.value };
      const newAccommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, submitData.availabilityStart!, submitData.availabilityEnd!, submitData.pricing!, submitData.price!, submitData.reservationCancellationDeadline!);
      newAccommodation.isApproved = false;

      this.axiosService.request(
        "POST",
        "/api/accommodations",
        newAccommodation
      ).then(
        response => {
          const accommodationRequest = new AccommodationRequest(null, this.oldAccommodation, response.data, "Updated");
          this.axiosService.request(
            "POST",
            "/api/accommodations/requests",
            accommodationRequest
          );
        }
      )

      this.oldAccommodation.isApproved = false;

      this.axiosService.request(
        "PUT",
        "/api/accommodations/"+this.accommodationId,
        this.oldAccommodation
      );

      this.router.navigate(["/accommodation/accommodations"]);
    }
    form.classList.add('was-validated');
  }
}

