import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../model/accommodation';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationViewComponent, FormsModule, SearchPipe]
})
export class AccommodationsComponent {

  accommodations: Accommodation[] = [];
  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/api/accommodations",
      {}
      ).then(
      response => {
          this.accommodations = response.data;
      });
  }


  searchtext: string  = '';
  searchnumber: string = '';
  searchprice: string ='';
  searchtype: string =''; 
  searchbenefits: any[] = [""];
  searchstartdate: string='';
  searchenddate: string='';


}
