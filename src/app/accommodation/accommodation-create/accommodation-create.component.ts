import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Accommodation, AccommodationTypeMapping, AccommodationType, DateRange } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccommodationRequest } from '../../accommodation-request/model/accommodation-request';
import { AxiosService } from '../../axios.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  acceptance = "manual";

  rangeIds: number[] = [];

  @Output() newDataEvent = new EventEmitter();
  route: ActivatedRoute = inject(ActivatedRoute);

  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private axiosService: AxiosService, private router: Router) {

    this.createForm = this.formBuilder.group({
      ownerEmail: [axiosService.getEmail(), Validators.compose([Validators.required, Validators.email])],
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

  addNewDateRange() {
    let id = 1;
    if (this.rangeIds.length != 0)
      id = this.rangeIds[this.rangeIds.length - 1] + 1;
    this.rangeIds.push(id);
    this.createForm.addControl("availabilityStart" + id, new FormControl(new Date(), [Validators.required]));
    this.createForm.addControl("availabilityEnd" + id, new FormControl(new Date(), [Validators.required]));
    this.createForm.addControl("price" + id, new FormControl(new Date(), [Validators.required, Validators.min(1)]));
  }

  removeDateRange(id: number) {
    this.rangeIds.forEach((element, index) => {
      if (element == id) this.rangeIds.splice(index, 1);
    });
    this.createForm.removeControl("availabilityStart" + id);
    this.createForm.removeControl("availabilityEnd" + id);
    this.createForm.removeControl("price" + id);
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {

      const submitData = { ...this.createForm.value };
      let availabilityRanges: DateRange[] = [];
      availabilityRanges.push(new DateRange(submitData.availabilityStart, submitData.availabilityEnd, submitData.price));
      this.rangeIds.forEach(rangeId => {
        const startDateName = "availabilityStart" + rangeId;
        const endDateName = "availabilityEnd" + rangeId;
        const priceName = "price" + rangeId;
        availabilityRanges.push(new DateRange(submitData[startDateName], submitData[endDateName], submitData[priceName]));
      });
      const accommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, availabilityRanges, submitData.pricing!, submitData.reservationCancellationDeadline!, this.acceptance);
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
      this.router.navigate(["/accommodation/accommodations"]);
    }
    form.classList.add('was-validated');

  }
}
