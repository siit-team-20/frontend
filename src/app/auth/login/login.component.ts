import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaxValidator, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/user';
import { Credentials } from '../model/credentials';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private axiosService: AxiosService, private router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(5)])]
    });

  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    
    if (!(form.checkValidity() === false)) {

      const loginData = { ...this.loginForm.value };
      const credentials = new Credentials(loginData.email, loginData.password);

      this.axiosService.request(
		    "POST",
		    "/login",
		    credentials
        ).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
            this.axiosService.setUser(response.data);
            this.router.navigate(['/accommodation/accommodations']);
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
            this.axiosService.setUser(null);
		    }
		  );

    }
    form.classList.add('was-validated');
  }
}
