import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { Accommodation, DateRange } from '../model/accommodation';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrl: './accommodation-detail.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class AccommodationDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  accommodationId = -1;
  accommodation: Accommodation = new Accommodation(0, "", "", "", "", 0, 0, "", "", new Array<DateRange>(), "", 0,"");

  createForm: FormGroup;

  constructor(private axiosService: AxiosService, private router: Router, private formBuilder: FormBuilder){
    this.accommodationId = Number(this.route.snapshot.params['id']);
    this.createForm = this.formBuilder.group({

      availabilityStart: [new Date(), [Validators.required]],
      availabilityEnd: [new Date(), [Validators.required]]
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
       console.log(this.accommodation);
      });
  }

  addNewDateRange() {
   

    this.createForm.addControl("availabilityStart", new FormControl(new Date(), [Validators.required]));
    // this.createForm.addControl("availabilityEnd", new FormControl(new Date(), [Validators.required]));
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {
        const startDateName = "availabilityStart";
        // const endDateName = "availabilityEnd";
      
      
      }

  }

}
