import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Accommodation, AccommodationTypeMapping, AccommodationType, DateRange } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequest } from '../../accommodation-request/model/accommodation-request';
import { AxiosService } from '../../axios.service';
import { ReservationValidator } from '../accommodation-detail/accommodation-detail.component';
import { ReservationWithAccommodation } from '../../reservation/model/reservationWithAccommodation';

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrl: './accommodation-update.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class AccommodationUpdateComponent implements OnInit {

  public rangeIds: number[] = [];
  public disabledIds: number[] = [];
  public accommodationTypeMapping = AccommodationTypeMapping;
  public accommodationTypes = Object.values(AccommodationType);
  reservations: ReservationWithAccommodation[] = [];
  typeSelect = this.accommodationTypeMapping[this.accommodationTypes[0]];
  pricing = "perGuest";
  acceptance = "automatic"

  @Output() updateDataEvent = new EventEmitter();

  updateForm: FormGroup;
  oldAccommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, "");
  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;

  constructor(private axiosService: AxiosService, private formBuilder: FormBuilder, private router: Router, public datePipe: DatePipe) {

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
      availabilityStart: [, [Validators.required]],
      availabilityEnd: [, [Validators.required]],
      price: [, Validators.compose([Validators.required, Validators.min(1)])],
      pricing: [this.pricing, [Validators.required]],
      reservationCancellationDeadline: [, Validators.compose([Validators.required, Validators.min(1)])],
      acceptance: [this.acceptance, [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/api/accommodations/reservations?accommodationId=" + this.accommodationId,
      {}
    ).then(
      response => {
        this.reservations = response.data;
        this.axiosService.request(
          "GET",
          "/api/accommodations/" + this.accommodationId,
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


            let availabilityDates = (response.data.availabilityDates as Array<DateRange>).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

            const startDate = this.datePipe.transform(availabilityDates[0].startDate, "yyyy-MM-dd");
            const endDate = this.datePipe.transform(availabilityDates[0].endDate, "yyyy-MM-dd");
            this.updateForm.controls["availabilityStart"].setValue(startDate);
            this.updateForm.controls["availabilityEnd"].setValue(endDate);
            this.updateForm.controls["price"].setValue(response.data.availabilityDates[0].price);

            let availabilityRangeStart = new Date(availabilityDates[0].startDate);
            let availabilityRangeEnd = new Date(availabilityDates[0].endDate);
            let availabilityDateRange = new DateRange(availabilityRangeStart, availabilityRangeEnd, 0);

            this.reservations.forEach(reservation => {

              let reservationStart = new Date(reservation.date);
              let reservationEnd = new Date(reservation.date);
              reservationEnd.setDate(reservationEnd.getDate() + reservation.days);
              let reservationDateRange = new DateRange(reservationStart, reservationEnd, 0);

              if (availabilityDateRange.IsOverlapping(reservationDateRange)) {
                this.disabledIds.push(0);
                this.updateForm.controls["availabilityStart"].disable();
                this.updateForm.controls["availabilityEnd"].disable();
                this.updateForm.controls["price"].disable();
                return;
              }

            });

            for (let i = 0; i < availabilityDates.length - 1; i++) {
              this.rangeIds.push(i + 1);

              let availabilityRangeStart = new Date(availabilityDates[i + 1].startDate);
              let availabilityRangeEnd = new Date(availabilityDates[i + 1].endDate);
              let availabilityDateRange = new DateRange(availabilityRangeStart, availabilityRangeEnd, 0);

              this.reservations.forEach(reservation => {

                let reservationStart = new Date(reservation.date);
                let reservationEnd = new Date(reservation.date);
                reservationEnd.setDate(reservationEnd.getDate() + reservation.days);
                let reservationDateRange = new DateRange(reservationStart, reservationEnd, 0);

                if (availabilityDateRange.IsOverlapping(reservationDateRange)) {
                  this.disabledIds.push(i + 1);
                  return;
                }

              });


              this.updateForm.addControl("availabilityStart" + (i + 1), new FormControl(null, [Validators.required]));
              this.updateForm.addControl("availabilityEnd" + (i + 1), new FormControl(null, [Validators.required]));
              this.updateForm.addControl("price" + (i + 1), new FormControl(null, [Validators.required]));
              const startDate = this.datePipe.transform(availabilityDates[i + 1].startDate, "yyyy-MM-dd");
              const endDate = this.datePipe.transform(availabilityDates[i + 1].endDate, "yyyy-MM-dd");
              this.updateForm.controls["availabilityStart" + (i + 1)].setValue(startDate);
              this.updateForm.controls["availabilityEnd" + (i + 1)].setValue(endDate);
              this.updateForm.controls["price" + (i + 1)].setValue(response.data.availabilityDates[i + 1].price);

              if (this.disabledIds.indexOf(i + 1) > -1) {
                this.updateForm.controls["availabilityStart" + (i + 1)].disable();
                this.updateForm.controls["availabilityEnd" + (i + 1)].disable();
                this.updateForm.controls["price" + (i + 1)].disable();
              }
            }

            if (response.data.isPriceByGuest) {
              this.updateForm.controls["pricing"].setValue("perGuest");
            }
            else {
              this.updateForm.controls["pricing"].setValue("perDay");
            }

            this.updateForm.controls["reservationCancellationDeadline"].setValue(response.data.reservationCancellationDeadline);

            if (response.data.isAutomaticAcceptance) {
              this.updateForm.controls["acceptance"].setValue("automatic");
            }
            else {
              this.updateForm.controls["acceptance"].setValue("manual");
            }

            this.oldAccommodation = response.data;
          });
      }
    );

  }

  addNewDateRange() {
    let id = 1;
    if (this.rangeIds.length != 0)
      id = this.rangeIds[this.rangeIds.length - 1] + 1;
    this.rangeIds.push(id);
    this.updateForm.addControl("availabilityStart" + id, new FormControl(null, [Validators.required]));
    this.updateForm.addControl("availabilityEnd" + id, new FormControl(null, [Validators.required]));
    this.updateForm.addControl("price" + id, new FormControl(null, [Validators.required]));
  }

  removeDateRange(id: number) {
    this.rangeIds.forEach((element, index) => {
      if (element == id) this.rangeIds.splice(index, 1);
    });
    this.updateForm.removeControl("availabilityStart" + id);
    this.updateForm.removeControl("availabilityEnd" + id);
    this.updateForm.removeControl("price" + id);
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    this.updateForm.addValidators(AccommodationValidator.validateDates(this.rangeIds));
    this.updateForm.addValidators(AccommodationValidator.validateGuestNumber());
    this.updateForm.updateValueAndValidity();

    if (!(form.checkValidity() === false) && this.updateForm.errors == null) {

      if (this.disabledIds.indexOf(0) > -1) {
        this.updateForm.controls["availabilityStart"].enable();
        this.updateForm.controls["availabilityEnd"].enable();
        this.updateForm.controls["price"].enable();
      }

      this.disabledIds.forEach(i => {
        if (i != 0) {
          this.updateForm.controls["availabilityStart" + (i)].enable();
          this.updateForm.controls["availabilityEnd" + (i)].enable();
          this.updateForm.controls["price" + (i)].enable();
        }
      });

      const submitData = { ...this.updateForm.value };

      if (this.disabledIds.indexOf(0) > -1) {
        this.updateForm.controls["availabilityStart"].disable();
        this.updateForm.controls["availabilityEnd"].disable();
        this.updateForm.controls["price"].disable();
      }

      this.disabledIds.forEach(i => {
        if (i != 0) {
          this.updateForm.controls["availabilityStart" + (i)].disable();
          this.updateForm.controls["availabilityEnd" + (i)].disable();
          this.updateForm.controls["price" + (i)].disable();
        }
      });

      let availabilityRanges: DateRange[] = [];
      availabilityRanges.push(new DateRange(submitData.availabilityStart, submitData.availabilityEnd, submitData.price));
      this.rangeIds.forEach(rangeId => {
        const startDateName = "availabilityStart" + rangeId;
        const endDateName = "availabilityEnd" + rangeId;
        const priceName = "price" + rangeId;
        availabilityRanges.push(new DateRange(submitData[startDateName], submitData[endDateName], submitData[priceName]));
      });

      const newAccommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, availabilityRanges, submitData.pricing!, submitData.reservationCancellationDeadline!, submitData.acceptance!);
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
        "/api/accommodations/" + this.accommodationId,
        this.oldAccommodation
      ).then(
        response => {
          this.router.navigate(["/accommodation/accommodations"]);
        }
      );

    }
    form.classList.add('was-validated');
  }
}

export class AccommodationValidator {

  public static validateGuestNumber() {

    return (control: AbstractControl) => {

      let minGuests = control.get("minGuests")?.value;
      let maxGuests = control.get("maxGuests")?.value;;

      let minGuestsInput = document.getElementsByName('minGuests')[0] as HTMLFormElement;

      if (minGuests > maxGuests || minGuests == null) {
        minGuestsInput.classList.add("is-invalid");
        minGuestsInput.classList.remove("is-valid");
        return { minGuests: true };
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
      let indexes = new Array<number>();
      indexes.push(0);
      for (let i = 0; i < rangeIds.length; i++) {
        indexes.push(rangeIds[i]);
      }

      for (let i = 0; i < availabilityRanges.length; i++) {

        if (availabilityRanges[i].startDate.getFullYear() == 1970 || availabilityRanges[i].endDate.getFullYear() == 1970 || String(availabilityRanges[i].startDate) == "Invalid Date" || String(availabilityRanges[i].endDate) == "Invalid Date")
          continue;

        availabilityRanges[i].SetTimeToZero();

        if (availabilityRanges[i].startDate >= availabilityRanges[i].endDate)
          startBeforeEnd.push(indexes[i]);

        for (let j = i + 1; j < availabilityRanges.length; j++) {

          if (availabilityRanges[j].startDate.getFullYear() == 1970 || availabilityRanges[j].endDate.getFullYear() == 1970 || String(availabilityRanges[j].startDate) == "Invalid Date" || String(availabilityRanges[j].endDate) == "Invalid Date")
            continue;

          if (availabilityRanges[i].IsOverlapping(availabilityRanges[j])) {

            if (invalids.indexOf(indexes[i]) <= -1) {
              invalids.push(indexes[i]);
            }

            if (invalids.indexOf(indexes[j]) <= -1) {
              invalids.push(indexes[j]);
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

      // console.log(indexes);
      // console.log(invalids);
      // console.log(startBeforeEnd);

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

      type Ret = { [key: string]: boolean }
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

