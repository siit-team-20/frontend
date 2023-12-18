import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AccommodationViewComponent } from './accommodation-view/accommodation-view.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AccommodationCreateComponent,
    AccommodationViewComponent,
    AccommodationsComponent
  ],
  exports: [

  ]
})
export class AccommodationModule { }
