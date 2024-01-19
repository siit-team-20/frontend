import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserType } from '../../auth/model/user';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class ProfileUpdateComponent implements OnInit {

  updateForm: FormGroup;
  route: ActivatedRoute = inject(ActivatedRoute);
  email = '';
  isPasswordShown = false;
  @Output() updateDataEvent = new EventEmitter();

  constructor(private axiosService: AxiosService, private formBuilder: FormBuilder, private router: Router) {

    this.email = this.route.snapshot.params['email'];

    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      address: ["", [Validators.required]],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10)])],
    });

  }

  ngOnInit(): void {
    this.updateForm.controls["name"].setValue(this.axiosService.getUser()["name"]);
    this.updateForm.controls["surname"].setValue(this.axiosService.getUser()["surname"]);
    this.updateForm.controls["address"].setValue(this.axiosService.getUser()["address"]);
    this.updateForm.controls["email"].setValue(this.axiosService.getUser()["sub"]);
    this.updateForm.controls["phone"].setValue(this.axiosService.getUser()["phone"]);
  }

  onSubmit(): void {

    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {

      const submitData = { ...this.updateForm.value };

      let updatedUser: User;
      if (this.isPasswordShown) 
        updatedUser = new User(submitData.email, submitData.password, submitData.name, submitData.surname, submitData.address, submitData.phone, this.axiosService.getRole() as UserType);
      else
        updatedUser = new User(submitData.email, "", submitData.name, submitData.surname, submitData.address, submitData.phone, this.axiosService.getRole() as UserType);

      this.axiosService.request(
        "PUT",
        "/account/" + updatedUser.email,
        updatedUser
      ).then(
        response => {
          this.axiosService.setAuthToken(response.data.token);
          this.router.navigate(['/profile']);
        }).catch(
          error => {
            this.axiosService.setAuthToken(null);
          }
        );

      this.router.navigate(["/profile"]);
    }
    form.classList.add('was-validated');
  }

  updatePasswordControls() {
    if (!this.isPasswordShown) {
      this.updateForm.addControl("password", new FormControl("", [Validators.required, Validators.minLength(5)]));
      this.updateForm.addControl("confirmPassword", new FormControl("", [Validators.required, Validators.minLength(5)]));
      this.isPasswordShown = true;
    }
    else {
      this.updateForm.removeControl("password");
      this.updateForm.removeControl("confirmPassword");
      this.isPasswordShown = false;
    }
  }

}
