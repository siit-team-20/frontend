import { Component, EventEmitter, Output } from '@angular/core';
import { Accommodation, AccommodationTypeMapping, AccommodationType } from '../model/accommodation';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

    this.createForm = this.formBuilder.group({
      ownerEmail: ["", [Validators.required]],
      name: ["", [Validators.required]],
      location: ["", [Validators.required]],
      description: ["", [Validators.required]],
      minGuests: [0, [Validators.required]],
      maxGuests: [0, [Validators.required]],
      accommodationType: [this.typeSelect, [Validators.required]],
      benefits: ["", [Validators.required]],
      availabilityStart: [new Date(), [Validators.required]],
      availabilityEnd: [new Date(), [Validators.required]],
      price: [0, [Validators.required]],
      pricing: [this.pricing, [Validators.required]],
      reservationCancellationDeadline: [0, [Validators.required]],
    });

  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const submitData = { ...this.createForm.value };
      console.log(submitData);
      const accommodation = new Accommodation(null, submitData.ownerEmail!, submitData.name!, submitData.description!, submitData.location!, submitData.minGuests!, submitData.maxGuests!, submitData.accommodationType!, submitData.benefits!, submitData.availabilityStart!, submitData.availabilityEnd!, submitData.pricing!, submitData.price!, submitData.reservationCancellationDeadline!);
      console.log(accommodation);
      this.http.post<Accommodation>(
        "http://localhost:8080/api/accommodations",
        accommodation
      ).subscribe(data => this.newDataEvent.emit(data));
    }
  }
}
