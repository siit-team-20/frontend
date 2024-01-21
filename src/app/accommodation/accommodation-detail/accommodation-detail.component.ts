import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { Accommodation, DateRange } from '../model/accommodation';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reservation, ReservationStatus } from '../../reservation/model/reservation';
import { OwnerReview } from '../model/ownerReview';
import { AccommodationReview } from '../model/accommodationReview';
import { UserType } from '../../auth/model/user';
import { AccommodationReviewViewComponent } from '../../review/accommodation-review-view/accommodation-review-view.component';


@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrl: './accommodation-detail.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, AccommodationReviewViewComponent]
})
export class AccommodationDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;
  canRateOwner = false;
  canRateAccommodation = false;
  currentPrice = 0;
  ownerRating = "three";
  accommodationRating = "three";
  accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, "");

  accommodationReviews: AccommodationReview[] = [];

  reservationForm: FormGroup;
  ownerReviewForm: FormGroup;
  accommodationReviewForm: FormGroup;

  constructor(public axiosService: AxiosService, private router: Router, private formBuilder: FormBuilder, public datePipe: DatePipe) {
    this.accommodationId = Number(this.route.snapshot.params['id']);
    this.reservationForm = this.formBuilder.group({
      availabilityStart: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      availabilityEnd: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      guestNumber: [1, [Validators.required, Validators.min(1), Validators.max(30)]]
    });

    this.ownerReviewForm = this.formBuilder.group({
      ownerComment: ["", [Validators.required]],
      ownerRating: [this.ownerRating, [Validators.required]],
    });

    this.accommodationReviewForm = this.formBuilder.group({
      accommodationComment: ["", [Validators.required]],
      accommodationRating: [this.accommodationRating, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/api/accommodations/" + this.accommodationId,
      {}
    ).then(
      response => {

        this.accommodation = response.data;
        this.accommodation.availabilityDates = this.accommodation.availabilityDates.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        let query: string = "";
        query = "?accommodationId=" + this.accommodation.id + "&onlyNotApproved=false";

        this.axiosService.request(
          "GET",
          "/api/accommodations/reviews" + query,
          {}
        ).then(
          response => {
            this.accommodationReviews = response.data;
          });

        this.axiosService.request(
          "GET",
          "/api/accommodations/reservations?ownerEmail=" + this.accommodation.ownerEmail + "&status=Finished&guestEmail=" + this.axiosService.getEmail(),
          {}
        ).then(
          response => {
            if (response.data.length > 0)
              this.canRateOwner = true;
          });

        this.axiosService.request(
          "GET",
          "/api/accommodations/reservations?status=Finished&days=7&guestEmail=" + this.axiosService.getEmail() + "&accommodationId=" + this.accommodationId,
          {}
        ).then(
          response => {
            if (response.data.length > 0)
              this.canRateAccommodation = true;
          });

      });



  }

  inputChanged(): void {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;

    this.currentPrice = 0;

    if (!(form.checkValidity() === false) && this.reservationForm.errors == null) {

      let inputRange = new DateRange(new Date(this.reservationForm.get("availabilityStart")?.value), new Date(this.reservationForm.get("availabilityEnd")?.value), 0);
      inputRange.SetTimeToZero();

      let validRange = false;
      let validStart = false;
      let validStartBeforeTomorrow = false;

      if (inputRange.startDate < inputRange.endDate) {
        validStart = true;
      }

      let tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (inputRange.startDate >= tomorrow) {
        validStartBeforeTomorrow = true;
      }

      for (let i = 0; i < this.accommodation.availabilityDates.length; i++) {

        let availableRangeCurrent = new DateRange(new Date(this.accommodation.availabilityDates[i].startDate), new Date(this.accommodation.availabilityDates[i].endDate), this.accommodation.availabilityDates[i].price);
        availableRangeCurrent.SetTimeToZero();

        if (inputRange.IsBetween(availableRangeCurrent)) {

          let days = Math.floor((inputRange.endDate.getTime() - inputRange.startDate.getTime()) / 1000 / 60 / 60 / 24);
          if (validStart)
            this.currentPrice += days * availableRangeCurrent.price;
          validRange = true;
          break;

        }
        else {

          if (i != this.accommodation.availabilityDates.length - 1) {

            let availableRangePast = new DateRange(new Date(this.accommodation.availabilityDates[i].startDate), new Date(this.accommodation.availabilityDates[i].endDate), this.accommodation.availabilityDates[i].price);
            availableRangePast.SetTimeToZero();

            if (inputRange.startDate >= availableRangeCurrent.startDate && inputRange.startDate < availableRangeCurrent.endDate) {

              let days = Math.floor((availableRangeCurrent.endDate.getTime() - inputRange.startDate.getTime()) / 1000 / 60 / 60 / 24);
              if (validStart)
                this.currentPrice += days * availableRangeCurrent.price;

              for (let j = i + 1; j < this.accommodation.availabilityDates.length; j++) {

                let availableRangeNext = new DateRange(new Date(this.accommodation.availabilityDates[j].startDate), new Date(this.accommodation.availabilityDates[j].endDate), this.accommodation.availabilityDates[j].price);
                availableRangeNext.SetTimeToZero();

                if (availableRangeNext.startDate.getTime() == availableRangePast.endDate.getTime()) {

                  if (inputRange.endDate >= availableRangeNext.startDate && inputRange.endDate <= availableRangeNext.endDate) {
                    let days = Math.floor((inputRange.endDate.getTime() - availableRangeNext.startDate.getTime()) / 1000 / 60 / 60 / 24);
                    if (validStart)
                      this.currentPrice += days * availableRangeNext.price;
                    validRange = true;
                    break;
                  }
                  else {
                    let days = Math.floor((availableRangePast.endDate.getTime() - availableRangePast.startDate.getTime()) / 1000 / 60 / 60 / 24);
                    if (validStart)
                      this.currentPrice += days * availableRangeNext.price;
                  }


                }

                availableRangePast = availableRangeNext;

              }

            }

          }

        }

      }

      if (this.accommodation.isPriceByGuest)
        this.currentPrice *= this.reservationForm.get("guestNumber")?.value;

    }

  }

  onSubmit(): void {

    var form = document.getElementsByName('reservationForm')[0] as HTMLFormElement;
    this.reservationForm.addValidators(ReservationValidator.validateDates(this.accommodation.availabilityDates, this.reservationForm, this.accommodation));
    this.reservationForm.addValidators(ReservationValidator.validateGuestNumber(this.accommodation.minGuests, this.accommodation.maxGuests));
    this.reservationForm.updateValueAndValidity();

    if (!(form.checkValidity() === false) && this.reservationForm.errors == null) {

      let inputRange = new DateRange(new Date(this.reservationForm.get("availabilityStart")?.value), new Date(this.reservationForm.get("availabilityEnd")?.value), 0);
      const reservation = new Reservation(null, this.axiosService.getEmail(), this.accommodationId, inputRange.startDate, Math.floor((inputRange.endDate.getTime() - inputRange.startDate.getTime()) / 1000 / 60 / 60 / 24), this.reservationForm.get("guestNumber")?.value, this.currentPrice, ReservationStatus.Waiting);
      this.axiosService.request(
        "POST",
        "/api/accommodations/reservations",
        reservation
      )
      this.router.navigate(["/"]);

    }

    form.classList.add('was-validated');

  }

  onSubmitAccommodationReview(): void {

    var form = document.getElementsByName('accommodationReviewForm')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false) && this.accommodationReviewForm.errors == null) {

      const accommodationReviewData = { ...this.accommodationReviewForm.value };
      const accommodationReview = new AccommodationReview(null, this.axiosService.getEmail(), this.accommodation.id!, accommodationReviewData.accommodationComment, accommodationReviewData.accommodationRating, false);
      this.axiosService.request(
        "POST",
        "/api/accommodations/reviews",
        accommodationReview
      )

    }
    form.classList.add('was-validated');

  }

  onSubmitOwnerReview(): void {

    var form = document.getElementsByName('ownerReviewForm')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false) && this.ownerReviewForm.errors == null) {

      const ownerReviewData = { ...this.ownerReviewForm.value };
      const ownerReview = new OwnerReview(null, this.axiosService.getEmail(), this.accommodation.ownerEmail, ownerReviewData.ownerComment, ownerReviewData.ownerRating, false);

      this.axiosService.request(
        "POST",
        "/api/ownerReviews",
        ownerReview
      )

    }
    form.classList.add('was-validated');
  }

}

export class ReservationValidator {

  public static validateGuestNumber(min: number, max: number) {

    return (control: AbstractControl) => {

      let guestNumber = control.get("guestNumber")?.value;

      let guestNumberInput = document.getElementsByName('guestNumber')[0] as HTMLFormElement;

      if (guestNumber < min || guestNumber > max || guestNumber == null) {
        guestNumberInput.classList.add("is-invalid");
        guestNumberInput.classList.remove("is-valid");
        return { guestNumber: true };
      }

      guestNumberInput.classList.remove("is-invalid");
      guestNumberInput.classList.add("is-valid");

      return null;

    }

  }

  public static validateDates(availabilityDates: Array<DateRange>, reservationForm: FormGroup, accommodation: any) {

    return (control: AbstractControl) => {

      let inputRange = new DateRange(new Date(control.get("availabilityStart")?.value), new Date(control.get("availabilityEnd")?.value), 0);
      inputRange.SetTimeToZero();

      var availabilityStart = document.getElementsByName('availabilityStart')[0] as HTMLFormElement;
      var availabilityEnd = document.getElementsByName('availabilityEnd')[0] as HTMLFormElement;

      let validRange = false;
      let validStart = false;
      let validStartBeforeTomorrow = false;

      if (inputRange.startDate < inputRange.endDate) {
        validStart = true;
      }

      let tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (inputRange.startDate >= tomorrow) {
        validStartBeforeTomorrow = true;
      }

      for (let i = 0; i < availabilityDates.length; i++) {

        let availableRangeCurrent = new DateRange(new Date(availabilityDates[i].startDate), new Date(availabilityDates[i].endDate), availabilityDates[i].price);
        availableRangeCurrent.SetTimeToZero();

        if (inputRange.IsBetween(availableRangeCurrent)) {


          validRange = true;
          break;

        }
        else {

          if (i != availabilityDates.length - 1) {

            let availableRangePast = new DateRange(new Date(availabilityDates[i].startDate), new Date(availabilityDates[i].endDate), availabilityDates[i].price);
            availableRangePast.SetTimeToZero();

            for (let j = i + 1; j < availabilityDates.length; j++) {

              let availableRangeNext = new DateRange(new Date(availabilityDates[j].startDate), new Date(availabilityDates[j].endDate), availabilityDates[j].price);
              availableRangeNext.SetTimeToZero();

              if (availableRangeNext.startDate.getTime() == availableRangePast.endDate.getTime()) {

                if (inputRange.startDate >= availableRangeCurrent.startDate && inputRange.startDate < availableRangeCurrent.endDate) {

                  if (inputRange.endDate >= availableRangeNext.startDate && inputRange.endDate <= availableRangeNext.endDate) {
                    validRange = true;
                    break;
                  }

                }

              }

              availableRangePast = availableRangeNext;

            }

          }

        }

      }

      type Ret = { [key: string]: boolean }
      const returnObject: Ret = {}
      let hasErrors = false;

      if (!validRange) {
        returnObject['notOverlapping'] = true;
        hasErrors = true;
      }

      if (!validStart) {
        returnObject['startAfterEnd'] = true;
        hasErrors = true;
      }

      if (!validStartBeforeTomorrow) {
        returnObject['startBeforeTomorrow'] = true;
        hasErrors = true;
      }

      if (validRange && validStart && validStartBeforeTomorrow) {
        availabilityStart.classList.remove('is-invalid');
        availabilityStart.classList.add('is-valid');
      }
      else {
        availabilityStart.classList.add('is-invalid');
        availabilityStart.classList.remove('is-valid');
      }

      if (validRange) {
        availabilityEnd.classList.remove('is-invalid');
        availabilityEnd.classList.add('is-valid');
      }
      else {
        availabilityEnd.classList.add('is-invalid');
        availabilityEnd.classList.remove('is-valid');
      }

      if (hasErrors)
        return returnObject;

      return null;

    }

  }

}