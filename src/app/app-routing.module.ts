import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRequestsComponent } from './accommodation-request/accommodation-requests/accommodation-requests.component';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { AccommodationsComponent } from './accommodation/accommodations/accommodations.component';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';

const routes: Routes = [
  { component: AccommodationRequestsComponent, path: "accommodation/requests" },
  { component: AccommodationCreateComponent, path: "accommodation/create" },
  { component: AccommodationsComponent, path: "accommodation/accommodations" },
  { component: AccommodationUpdateComponent, path: "accommodation/update/:id" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
