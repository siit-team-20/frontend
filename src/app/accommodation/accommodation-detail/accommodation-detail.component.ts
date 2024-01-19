import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { Accommodation, DateRange } from '../model/accommodation';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrl: './accommodation-detail.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,]
})
export class AccommodationDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;
  currentPrice = 0;
  accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0, "");

  reservationForm: FormGroup;

  constructor(private axiosService: AxiosService, private router: Router, private formBuilder: FormBuilder, public datePipe: DatePipe){
    this.accommodationId = Number(this.route.snapshot.params['id']);
    this.reservationForm = this.formBuilder.group({

      availabilityStart: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      availabilityEnd: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), [Validators.required]],
      guestNumber: [1, [Validators.required, Validators.min(1), Validators.max(30)]]
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
      });
  }

  inputChanged(): void {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    
    var startDateInput = document.getElementsByName('availabilityStart')[0] as HTMLFormElement;
    var endDateInput = document.getElementsByName('availabilityEnd')[0] as HTMLFormElement;
    var guestNumberInput = document.getElementsByName('guestNumber')[0] as HTMLFormElement;

    this.currentPrice = 0;

    if (!(form.checkValidity() === false)) {

      let inputRange = new DateRange(new Date(this.reservationForm.get("availabilityStart")?.value), new Date(this.reservationForm.get("availabilityEnd")?.value), 0);
      inputRange.SetTimeToZero();

      let validRange = false;
      let validStart = false;

      if (inputRange.startDate < inputRange.endDate) {
        validStart = true;
      } 

      for(let i = 0; i < this.accommodation.availabilityDates.length; i++) {

        let availableRangeCurrent = new DateRange(new Date(this.accommodation.availabilityDates[i].startDate), new Date(this.accommodation.availabilityDates[i].endDate), this.accommodation.availabilityDates[i].price);
        availableRangeCurrent.SetTimeToZero();

        if (inputRange.IsBetween(availableRangeCurrent)) {
          
          let days = Math.floor((inputRange.endDate.getTime() - inputRange.startDate.getTime()) / 1000 / 60 / 60 / 24);
          if (validStart)
            this.currentPrice += days * availableRangeCurrent.price;
          validRange = true; 
          break;

        }
        else  {

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

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    this.reservationForm.addValidators(DatesValidator.validateDates(this.accommodation.availabilityDates, this.reservationForm, this.accommodation));
    this.reservationForm.updateValueAndValidity();

    if (!(form.checkValidity() === false)) {

      let inputRange = new DateRange(new Date(this.reservationForm.get("availabilityStart")?.value), new Date(this.reservationForm.get("availabilityEnd")?.value), 0);
      //const reservation = new Reservation
      // this.axiosService.request(
      //   "POST",
      //   "/api/accommodations/reservations",
      //   accommodation
      // ).then(
      //   response => {
      //     const accommodationRequest = new AccommodationRequest(null, null, response.data as Accommodation, "Created");
      //     this.axiosService.request(
      //       "POST",
      //       "/api/accommodations/requests",
      //       accommodationRequest
      //     )
      //   });
      // this.router.navigate(["/accommodation/accommodations"]);

    }
    
    form.classList.add('was-validated');

  }

}

export class DatesValidator {

  public static validateDates(availabilityDates: Array<DateRange>, reservationForm: FormGroup, accommodation: any) {

    return (control: AbstractControl) => {

      let inputRange = new DateRange(new Date(control.get("availabilityStart")?.value), new Date(control.get("availabilityEnd")?.value), 0);
      inputRange.SetTimeToZero();

      var availabilityStart = document.getElementsByName('availabilityStart')[0] as HTMLFormElement;
      var availabilityEnd = document.getElementsByName('availabilityEnd')[0] as HTMLFormElement;

      let validRange = false;
      let validStart = false;

      if (inputRange.startDate < inputRange.endDate) {
        validStart = true;
      } 

      for(let i = 0; i < availabilityDates.length; i++) {

        let availableRangeCurrent = new DateRange(new Date(availabilityDates[i].startDate), new Date(availabilityDates[i].endDate), availabilityDates[i].price);
        availableRangeCurrent.SetTimeToZero();

        if (inputRange.IsBetween(availableRangeCurrent)) {

          
          validRange = true; 
          break;

        }
        else  {

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
      
      availabilityStart.classList.add('is-invalid');
      availabilityStart.classList.remove('is-valid');
      availabilityEnd.classList.add('is-invalid');
      availabilityEnd.classList.remove('is-valid');

      if (!validRange && !validStart)
        return { notOverlapping: true, startAfterEnd: true };

      if (!validRange)
        return { notOverlapping: true };

      availabilityStart.classList.add('is-invalid');
      availabilityStart.classList.remove('is-valid');
      availabilityEnd.classList.remove('is-invalid');
      availabilityEnd.classList.add('is-valid');

      if (!validStart)
        return { startAfterEnd: true }; 
        
      availabilityStart.classList.remove('is-invalid');
      availabilityStart.classList.add('is-valid');
      availabilityEnd.classList.remove('is-invalid');
      availabilityEnd.classList.add('is-valid');

      return null;

    }

  }

}
