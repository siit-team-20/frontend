import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accommodation, AccommodationTypeMapping, AccommodationType } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

    this.updateForm = this.formBuilder.group({
      ownerEmail: ["", [Validators.required, Validators.email]],
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
    this.http.get<Accommodation>("http://localhost:8080/api/accommodations/").subscribe({
      next: accommodation => {
        this.updateForm.controls["ownerEmail"].setValue(accommodation.ownerEmail);
        this.updateForm.controls["name"].setValue(accommodation.name);
        this.updateForm.controls["location"].setValue(accommodation.location);
        this.updateForm.controls["description"].setValue(accommodation.description);
        this.updateForm.controls["minGuests"].setValue(accommodation.minGuests);
        this.updateForm.controls["maxGuests"].setValue(accommodation.maxGuests);
        this.updateForm.controls["accommodationType"].setValue(accommodation.accommodationType);
        this.updateForm.controls["benefits"].setValue(accommodation.benefits);
        this.updateForm.controls["availabilityStart"].setValue(accommodation.availabilityStart);
        this.updateForm.controls["availabilityEnd"].setValue(accommodation.availabilityEnd);
        this.updateForm.controls["price"].setValue(accommodation.price);
        this.updateForm.controls["pricing"].setValue(accommodation.isPriceByGuest);
        this.updateForm.controls["reservationCancellationDeadline"].setValue(accommodation.reservationCancellationDeadline);
      }
    });
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {

      const submitData = { ...this.updateForm.value };
      const accommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, submitData.availabilityStart!, submitData.availabilityEnd!, submitData.pricing!, submitData.price!, submitData.reservationCancellationDeadline!);
      this.http.post<Accommodation>(
        "http://localhost:8080/api/accommodations",
        accommodation
      ).subscribe(data => this.updateDataEvent.emit(data));
    }
    form.classList.add('was-validated');
  }
}

