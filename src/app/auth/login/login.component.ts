import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaxValidator, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

  @Output() loginItemEvent = new EventEmitter();

  loginForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  onSubmit(): void {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!(form.checkValidity() === false)) {


    }
    form.classList.add('was-validated');

  }
}
