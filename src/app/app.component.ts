import { DatePipe } from '@angular/common';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DatePipe]
})
export class AppComponent {
  title = 'BookApp';
}

