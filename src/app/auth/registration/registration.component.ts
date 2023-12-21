import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
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

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {
      

      const registerData = { ...this.registerForm.value };
      let userTypeString: string = registerData.type as string;
      let userType: UserType = userTypeString as UserType;
      const user = new User(registerData.email, registerData.password, registerData.name, registerData.surname, registerData.address, registerData.phone, userType);

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
