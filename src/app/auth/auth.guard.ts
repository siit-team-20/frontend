import { CanActivateFn, Route } from '@angular/router';
import { AxiosService } from '../axios.service';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from './model/user';


@Injectable()
class AuthGuard {
  constructor(private router: Router, private axiosService: AxiosService) {}
}

export const authGuard: CanActivateFn = (route, state) => {

  const userRole: UserType = inject(AxiosService).getUser()?.type!;

  if (userRole == null) {
    inject(Router).navigate(['/auth/login']);
  }
  if (!route.data['role'].includes(userRole)) {
    inject(Router).navigate(['/accommodation/accommodations']);
    return false;
  }

  return true;
};
