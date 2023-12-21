import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth: AxiosService;

  constructor(private axiosService: AxiosService, private router: Router) {
    this.auth = axiosService;
  }

  logOut(): void {
    this.axiosService.setAuthToken(null);
    this.axiosService.setUser(null);
    this.router.navigate(['auth/login']);
  }
}
