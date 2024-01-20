import { ActivatedRouteSnapshot, CanActivateFn, Route, RouterStateSnapshot } from '@angular/router';
import { AxiosService } from '../axios.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router: Router = inject(Router);
  const user: any = inject(AxiosService).getUser();

  if (user == null) {
    router.navigate(['auth/login']);
    return false;
  }
  if (!route.data['role'].includes(user["type"])) {
    router.navigate(['']);
    return false;
  }
  return true;
};

export const loggedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router: Router = inject(Router);
  const user: any = inject(AxiosService).getUser();

  if (route.params["id"] != undefined) {
    let valid = true;
    let ownerEmail = '';
    inject(AxiosService).request(
      "GET",
      "/api/accommodations/" + route.params["id"],
      {}
    ).then(
      response => {
        ownerEmail = response.data.ownerEmail;
        if (ownerEmail != user["sub"]) {
          router.navigate(['']);
          valid = false;
        }
      });
    if (!valid)
      return false;
  }

  if (route.params["email"] != undefined) {
    if (route.params["email"] != user["sub"]) {
      router.navigate(['']);
      return false;
    }
  }
  return true;
};
