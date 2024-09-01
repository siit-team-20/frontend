import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReportViewComponent } from '../report-view/report-view.component';
import { Report } from '../../auth/model/report';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { User, UserType } from '../../auth/model/user';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true,
  imports: [CommonModule, ReportViewComponent]
})
export class ReportsComponent {

  reports: Report[] = [];
  user: User = new User("", "", "", "", "", "", UserType.Guest, false);

  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {

    this.axiosService.request(
      "GET",
      "/api/reports",
      {}
    ).then(
      response => {
        this.reports = response.data;
      });
  }

  dismissReport(report: any): void {

    let rep = report["report"];
    this.axiosService.request(
      "DELETE",
      "/api/reports/" + rep.id,
      {}
    ).then(
      response => {
        this.axiosService.request(
          "GET",
          "/api/reports",
          {}
        ).then(
          response => {
            this.reports = response.data;
          });
      });

  }

  blockUser(report: any): void {
    let rep = report["report"];

    this.axiosService.request(
      "GET",
      "/users/" + rep.reportedEmail,
      {}
    ).then(
      response => {
        this.user = response.data;
        
        let updatedUser = new User(this.user.email, "", this.user.name, this.user.surname, this.user.address, this.user.phone, this.user.type, true);
        this.axiosService.request(
          "PUT",
          "/account/" + updatedUser.email,
          updatedUser
        ).then(
          response => {
            this.axiosService.request(
              "DELETE",
              "/api/reports/" + rep.id,
              {}
            ).then(
              response => {
                this.axiosService.request(
                  "GET",
                  "/api/reports",
                  {}
                ).then(
                  response => {
                    this.reports = response.data;
                  });
              });
          }
        );
      });

    // let updatedUser: User;
    // updatedUser = new User(submitData.email, submitData.password, submitData.name, submitData.surname, submitData.address, submitData.phone, this.axiosService.getRole() as UserType, true);

    // this.axiosService.request(
    //   "PUT",
    //   "/account/" + updatedUser.email,
    //   updatedUser
    // ).then(
    //   response => {
    //     this.axiosService.setAuthToken(response.data.token);
    //     this.router.navigate(['/profile']);
    //   }).catch(
    //     error => {
    //       this.axiosService.setAuthToken(null);
    //     }
    //   );
  }

}


