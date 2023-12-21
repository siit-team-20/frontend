import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRequestsComponent } from './accommodation-request/accommodation-requests/accommodation-requests.component';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { AccommodationsComponent } from './accommodation/accommodations/accommodations.component';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { User, UserType } from './auth/model/user';

const routes: Routes = [
  { component: AccommodationsComponent, path: "" },
  { component: AccommodationRequestsComponent, path: "accommodation/requests", data: {role: [UserType.Admin]} },
  { component: AccommodationCreateComponent, path: "accommodation/create", data: {role: [UserType.Owner]} },
  { component: AccommodationsComponent, path: "accommodation/accommodations", data: {role: [UserType.Admin, UserType.Guest, UserType.Owner]} },
  { component: AccommodationUpdateComponent, path: "accommodation/update/:id", data: {role: [UserType.Owner]} },
  { component: LoginComponent, path: "auth/login" },
  { component: RegistrationComponent, path: "auth/register" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
