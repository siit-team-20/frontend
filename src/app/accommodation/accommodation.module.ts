import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AccommodationViewComponent } from './accommodation-view/accommodation-view.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AccommodationUpdateComponent } from './accommodation-update/accommodation-update.component';
import { SearchPipe } from './search.pipe';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { AccommodationFavouritesComponent } from './accommodation-favourites/accommodation-favourites.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AccommodationCreateComponent,
    AccommodationViewComponent,
    AccommodationsComponent,
    AccommodationUpdateComponent,
    SearchPipe,
    AccommodationDetailComponent,
    AccommodationFavouritesComponent

  ],
  exports: [
    
  ]
})
export class AccommodationModule { }
