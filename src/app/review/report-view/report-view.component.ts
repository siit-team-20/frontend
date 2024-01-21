import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Report } from '../../auth/model/report';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ReportViewComponent {


  auth: AxiosService;

  @Input() report: Report = new Report(0, "", "");
  @Output() blockUserEvent = new EventEmitter();
  @Output() dismissReportEvent = new EventEmitter();

  constructor(private axiosService: AxiosService) {
    this.auth = axiosService;
  }

}
