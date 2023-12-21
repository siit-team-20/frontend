import { Injectable } from '@angular/core';
import axios, { Method } from 'axios';
import { User } from './auth/model/user';
import { UserType } from './auth/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  getUser(): any | null {
    const helper = new JwtHelperService();
    if (this.getAuthToken() != null)
    {
      const decodedToken = helper.decodeToken(this.getAuthToken()!);
      return decodedToken;
    }
    return null;
  }

  getRole(): UserType | null {
    const user = this.getUser();
    if (user != null)
    {
      return user["type"];
    }
    return null;
  }

  getEmail(): string {
    const user = this.getUser();
    if (user != null)
    {
      return user["sub"];
    }
    return "";
  }

  request(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
        headers = {"Authorization": "Bearer " + this.getAuthToken()};
    }

    return axios({
      method: method as Method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
