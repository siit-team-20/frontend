import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRequestsComponent } from './accommodation-request/accommodation-requests/accommodation-requests.component';
import { AccommodationCreateComponent } from './accommodation/accommodation-create/accommodation-create.component';
import { AccommodationsComponent } from './accommodation/accommodations/accommodations.component';
import { AccommodationUpdateComponent } from './accommodation/accommodation-update/accommodation-update.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { User, UserType } from './auth/model/user';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { authGuard, loggedInGuard } from './auth/auth.guard';
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';
import { AccommodationDetailComponent } from './accommodation/accommodation-detail/accommodation-detail.component';
import { ReservationsComponent } from './reservation/reservations/reservations.component';

const routes: Routes = [
  { component: AccommodationsComponent, path: "" },
  { component: AccommodationRequestsComponent, path: "accommodation/requests", data: { role: [UserType.Admin] }, canActivate: [authGuard] },
  { component: AccommodationCreateComponent, path: "accommodation/create", data: { role: [UserType.Owner] }, canActivate: [authGuard] },
  { component: AccommodationsComponent, path: "accommodation/accommodations" },
  { component: AccommodationUpdateComponent, path: "accommodation/update/:id", data: { role: [UserType.Owner] }, canActivate: [authGuard, loggedInGuard] },
  { component: LoginComponent, path: "auth/login" },
  { component: RegistrationComponent, path: "auth/register" },
  { component: AccommodationDetailComponent, path: "accommodation/detail/:id" },
  { component: ProfileViewComponent, path: "profile/:email", data: { role: [UserType.Admin, UserType.Guest, UserType.Owner] }, canActivate: [authGuard] },
  { component: ProfileUpdateComponent, path: "profile/update/:email", data: { role: [UserType.Admin, UserType.Guest, UserType.Owner] }, canActivate: [authGuard, loggedInGuard] },
  { component: ReservationsComponent, path: "reservations", data: { role: [UserType.Guest, UserType.Owner] }, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
