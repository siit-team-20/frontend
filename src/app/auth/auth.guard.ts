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
