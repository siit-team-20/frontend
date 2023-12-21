import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../model/accommodation';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { AxiosService } from '../../axios.service';
import { UserType } from '../../auth/model/user';

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

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Owner)
      query = "?ownerEmail=" + this.axiosService.getUser()["sub"];
    else if (this.axiosService.getRole() != UserType.Admin)
      query = "?onlyApproved=true";
    
    this.axiosService.request(
      "GET",
      "/api/accommodations"+query,
      {}
      ).then(
      response => {
          this.accommodations = response.data;
      });
  }


  searchtext: string  = '';
  searchnumber: number = 0;
  searchprice: string ='';
  searchtype: string =''; 
  searchbenefits: any[] = [""];
  searchstartdate: string='';
  searchenddate: string='';


}
