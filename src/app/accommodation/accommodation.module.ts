import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AccommodationViewComponent } from './accommodation-view/accommodation-view.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AccommodationUpdateComponent } from './accommodation-update/accommodation-update.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccommodationCreateComponent,
    AccommodationViewComponent,
    AccommodationsComponent,
    AccommodationUpdateComponent
  ],
  exports: [

  ]
})
export class AccommodationModule { }
