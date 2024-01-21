import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Accommodation, AccommodationTypeMapping, AccommodationType, DateRange } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../../axios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequest } from '../../accommodation-request/model/accommodation-request';

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
      availabilityStart: [, [Validators.required]],
      availabilityEnd: [, [Validators.required]],
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
    this.createForm.addControl("availabilityStart" + id, new FormControl(null, [Validators.required]));
    this.createForm.addControl("availabilityEnd" + id, new FormControl(null, [Validators.required]));
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
    this.createForm.addValidators(AccommodationValidator.validateDates(this.rangeIds));
    this.createForm.addValidators(AccommodationValidator.validateGuestNumber());
    this.createForm.updateValueAndValidity();

    if (!(form.checkValidity() === false) && this.createForm.errors == null) {

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
          ).then(
            response => {
              this.router.navigate(["/accommodation/accommodations"]);
            }
          )
        });
    }
    form.classList.add('was-validated');

  }
}

export class AccommodationValidator {

  public static validateGuestNumber() {

    return (control: AbstractControl) => {

      let minGuests = control.get("minGuests")?.value;
      let maxGuests = control.get("maxGuests")?.value;

      let minGuestsInput = document.getElementsByName('minGuests')[0] as HTMLFormElement;

      if (minGuests > maxGuests || minGuests == null) {
        minGuestsInput.classList.add("is-invalid");
        minGuestsInput.classList.remove("is-valid");
        return {minGuests: true};
      }

      minGuestsInput.classList.remove("is-invalid");
      minGuestsInput.classList.add("is-valid");

      return null;

    }

  }

  public static validateDates(rangeIds: number[]) {

    return (control: AbstractControl) => {

      let availabilityRanges: DateRange[] = [];
      availabilityRanges.push(new DateRange(new Date(control.get("availabilityStart")?.value), new Date(control.get("availabilityEnd")?.value), control.get("price")?.value));
      rangeIds.forEach(rangeId => {
        const startDateName = "availabilityStart" + rangeId;
        const endDateName = "availabilityEnd" + rangeId;
        const priceName = "price" + rangeId;
        availabilityRanges.push(new DateRange(new Date(control.get(startDateName)?.value), new Date(control.get(endDateName)?.value), control.get(priceName)?.value));
      });

      let invalids = new Array<number>();
      let startBeforeEnd = new Array<number>();

      for(let i = 0; i < availabilityRanges.length; i++) {

        if (availabilityRanges[i].startDate.getFullYear() == 1970 || availabilityRanges[i].endDate.getFullYear() == 1970 || String(availabilityRanges[i].startDate) == "Invalid Date" || String(availabilityRanges[i].endDate) == "Invalid Date")
          continue;

        availabilityRanges[i].SetTimeToZero();

        if (availabilityRanges[i].startDate >= availabilityRanges[i].endDate)
          startBeforeEnd.push(i);

        for (let j = i + 1; j < availabilityRanges.length; j++) {

          if (availabilityRanges[j].startDate.getFullYear() == 1970 || availabilityRanges[j].endDate.getFullYear() == 1970 || String(availabilityRanges[j].startDate) == "Invalid Date" || String(availabilityRanges[j].endDate) == "Invalid Date")
            continue;

          if (availabilityRanges[i].IsOverlapping(availabilityRanges[j])) {

            if (invalids.indexOf(i) <= -1) {
              invalids.push(i);
            }

            if (invalids.indexOf(j) <= -1) {
              invalids.push(j);
            }

          }

        }

      }

      let availabilityStart = document.getElementsByName('availabilityStart')[0] as HTMLFormElement;
      let availabilityEnd = document.getElementsByName('availabilityEnd')[0] as HTMLFormElement;
      if (invalids.indexOf(0) > -1 || startBeforeEnd.indexOf(0) > -1) {
        availabilityStart.classList.add("is-invalid");
        availabilityStart.classList.remove("is-valid");
        availabilityEnd.classList.add("is-invalid");
        availabilityEnd.classList.remove("is-valid");
      }
      else {
        if (availabilityRanges[0].startDate.getFullYear() != 1970 && String(availabilityRanges[0].startDate) != "Invalid Date") {
          availabilityStart.classList.remove("is-invalid");
          availabilityStart.classList.add("is-valid");
        }
        if (availabilityRanges[0].endDate.getFullYear() != 1970 && String(availabilityRanges[0].endDate) != "Invalid Date") {
          availabilityEnd.classList.remove("is-invalid");
          availabilityEnd.classList.add("is-valid");
        }
      }

      for (let i = 0; i < rangeIds.length; i++) {

        let availabilityStart = document.getElementsByName('availabilityStart' + rangeIds[i])[0] as HTMLFormElement;
        let availabilityEnd = document.getElementsByName('availabilityEnd' + rangeIds[i])[0] as HTMLFormElement;

        if (availabilityEnd == undefined) {
          continue;
        }

        if (invalids.indexOf(rangeIds[i]) > -1 || startBeforeEnd.indexOf(rangeIds[i]) > -1) {
          availabilityStart.classList.add("is-invalid");
          availabilityStart.classList.remove("is-valid");
          availabilityEnd.classList.add("is-invalid");
          availabilityEnd.classList.remove("is-valid");
        }
        else {
          if (availabilityRanges[i + 1].startDate.getFullYear() != 1970 && String(availabilityRanges[i + 1].startDate) != "Invalid Date") {
            availabilityStart.classList.remove("is-invalid");
            availabilityStart.classList.add("is-valid");
          }
          if (availabilityRanges[i + 1].endDate.getFullYear() != 1970 && String(availabilityRanges[i + 1].endDate) != "Invalid Date") {
            availabilityEnd.classList.remove("is-invalid");
            availabilityEnd.classList.add("is-valid");
          }
        }

      }

      type Ret = {[key: string] : boolean}
      const returnObject: Ret = {}
      let hasErrors = false;

      if (invalids.length != 0) {
        returnObject['datesOverlapping'] = true;
        hasErrors = true;
      }


      if (startBeforeEnd.indexOf(0) > -1) {
        returnObject["startBeforeEnd"] = true;
        hasErrors = true;
      }

      for (let i = 0; i < rangeIds.length; i++) {
        if (startBeforeEnd.indexOf(rangeIds[i]) > -1) {
          returnObject["startBeforeEnd" + rangeIds[i]] = true;
          hasErrors = true;
        }
      }

      if (hasErrors)
        return returnObject;

      return null;

    }

  }

}
