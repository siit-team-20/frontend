import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { User, UserType, UserTypeMapping } from '../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,]
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10)])]
    });
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {


    }
    form.classList.add('was-validated');
  }
}
