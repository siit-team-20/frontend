import { Component, Input, OnInit } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { Notification } from '../model/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth: AxiosService;
  notifications: Notification[] = [];

  constructor(private axiosService: AxiosService, private router: Router, public datePipe: DatePipe) {
    this.auth = axiosService;
    router.events.subscribe((val) => {
      if (axiosService.getRole() == 'Owner' || axiosService.getRole() == 'Guest') {
        axiosService.request(
          "GET",
          "/api/notifications?userEmail=" + axiosService.getEmail(),
          {}
        ).then(
          response => {
            for (let i = 0; i < response.data.length; i++) {
              let date = response.data[i]["createdAt"];
              response.data[i]["createdAt"] = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
            }
            this.notifications = response.data;
            this.notifications.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }
        );
      }
    })
  }

  logOut(): void {
    this.axiosService.setAuthToken(null);
    this.router.navigate(['auth/login']);
  }

  ngOnInit(): void {

    

  }
}
