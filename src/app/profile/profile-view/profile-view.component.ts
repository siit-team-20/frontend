import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class ProfileViewComponent {

  profileForm: FormGroup;

  constructor(private axiosService: AxiosService, private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      location: [""],
      phone: [],
      password: [""],
      confirmPassword: [""]
    });

  }

  ngOnInit(): void {
    this.profileForm.controls["firstName"].setValue(this.axiosService.getUser()["name"]);
    this.profileForm.controls["lastName"].setValue(this.axiosService.getUser()["surname"]);
    this.profileForm.controls["location"].setValue(this.axiosService.getUser()["address"]);
    this.profileForm.controls["email"].setValue(this.axiosService.getUser()["sub"]);
    this.profileForm.controls["phone"].setValue(this.axiosService.getUser()["phone"]);
  }

}
