import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { Router } from '@angular/router';
import { Accommodation } from '../model/accommodation';
import { UserType } from '../../auth/model/user';
import { CommonModule } from '@angular/common';
import { AccommodationViewComponent } from '../accommodation-view/accommodation-view.component';
import { FormsModule } from '@angular/forms';
import { FavouriteAccommodation } from '../model/favouriteAccommodation';

@Component({
  selector: 'app-accommodation-favourites',
  templateUrl: './accommodation-favourites.component.html',
  styleUrl: './accommodation-favourites.component.css',
  standalone: true,
  imports: [CommonModule, AccommodationViewComponent, FormsModule]
})
export class AccommodationFavouritesComponent {

  favouriteAccommodations: FavouriteAccommodation[] = [];
  constructor(private axiosService: AxiosService, private router: Router) {

  }

  ngOnInit(): void {

    let query: string = "";
    if (this.axiosService.getRole() == UserType.Guest)
      query = "?guestEmail=" + this.axiosService.getUser()["sub"];

    this.axiosService.request(
      "GET",
      "/api/accommodations/favourites" + query,
      {}
    ).then(
      response => {
        this.favouriteAccommodations = response.data;
        console.log(this.favouriteAccommodations)
      });
  }

}
