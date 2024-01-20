import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User, UserType } from '../../auth/model/user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink]
})
export class ProfileViewComponent {

  auth: AxiosService;
  route: ActivatedRoute = inject(ActivatedRoute);
  profileEmail = "";
  user: User = new User("", "", "", "", "", "", UserType.Guest);

  constructor(private axiosService: AxiosService, private router: Router) {
    this.auth = axiosService;
    this.profileEmail = this.route.snapshot.params["email"];
  }

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/users/" + this.profileEmail,
      {}
    ).then(
      response => {
        this.user = response.data;
      });
  }

  deleteUser() {
    this.auth.request(
      "DELETE",
      "/account/" + this.auth.getEmail(),
      {}
    ).then(
      response => {
          this.router.navigate(['/']);
          this.axiosService.setAuthToken(null);
      });
  }

}
