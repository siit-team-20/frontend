import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User, UserType, UserTypeMapping } from '../model/user';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,]
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private axiosService: AxiosService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmPassword: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10)])],
      type: ["Guest", [Validators.required]]
    });
  }

  validatePassword(control: AbstractControl) {
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      var confirmPassword = document.getElementsByName('confirmPassword')[0] as HTMLFormElement;
      if (confirmPassword !== undefined) {
        confirmPassword.classList.add('is-invalid');
        confirmPassword.classList.remove('is-valid');
      }
    } else {
      control.get('confirmPassword')?.setErrors(null);
      var confirmPassword = document.getElementsByName('confirmPassword')[0] as HTMLFormElement;
      if (confirmPassword !== undefined) {
        confirmPassword.classList.remove('is-invalid');
        confirmPassword.classList.add('is-valid');
      }
    }
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    const form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    this.registerForm.addValidators(this.validatePassword);
    this.registerForm.setErrors(this.validatePassword(this.registerForm));

    if (!(form.checkValidity() === false) && this.registerForm.errors == null) {

      const registerData = { ...this.registerForm.value };
      let userTypeString: string = registerData.type as string;
      let userType: UserType = userTypeString as UserType;
      const user = new User(registerData.email, registerData.password, registerData.name, registerData.surname, registerData.address, registerData.phone, userType, false);

      this.axiosService.request(
        "POST",
        "/register",
        user
      ).then(
        response => {
          this.axiosService.setAuthToken(response.data.token);
          this.router.navigate(['/accommodation/accommodations']);
        }).catch(
          error => {
            this.axiosService.setAuthToken(null);
          }
        );

    }
    form.classList.add('was-validated');
  }
}
