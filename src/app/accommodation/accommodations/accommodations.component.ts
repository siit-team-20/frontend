import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../model/accommodation';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { UserType } from '../../auth/model/user';
import { Router } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { FavouriteAccommodation } from '../model/favouriteAccommodation';
import { Notification } from '../../navbar/model/notification';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationViewComponent, FormsModule, SearchPipe]
})
export class AccommodationsComponent {

  accommodations: Accommodation[] = [];
  notifications: Notification[] = [];
  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Owner && this.router.url != '/')
      query = "?ownerEmail=" + this.axiosService.getUser()["sub"];
    else if (this.axiosService.getRole() != UserType.Admin)
      query = "?onlyApproved=true";

    this.axiosService.request(
      "GET",
      "/api/accommodations" + query,
      {}
    ).then(
      response => {
        this.accommodations = response.data;
      });
  }

  addToFavourites(accommodation: any): void {
    let acc = accommodation["accommodation"];

    const newFavouriteAccommodation = new FavouriteAccommodation(null, this.axiosService.getEmail(), acc);
    console.log(newFavouriteAccommodation)

    this.axiosService.request(
      "POST",
      "/api/accommodations/favourites",
      newFavouriteAccommodation
    )
  }


  searchtext: string = '';
  searchnumber: number = 0;
  searchprice: string = '';
  searchtype: string = '';
  searchbenefits: any[] = [""];
  searchstartdate: string = '';
  searchenddate: string = '';


}
