import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRequestsComponent } from './accommodation-request/accommodation-requests/accommodation-requests.component';

const routes: Routes = [
  {component: AccommodationRequestsComponent, path:"accommodation/requests"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
