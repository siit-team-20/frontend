import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReportViewComponent } from '../report-view/report-view.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true,
  imports: [CommonModule, ReportViewComponent]
})
export class ReportsComponent {

}
