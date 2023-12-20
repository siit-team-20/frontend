import { Injectable } from '@angular/core';
import axios, { Method } from 'axios';
import { User } from './auth/model/user';
import { UserType } from './auth/model/user';

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

  getUser(): User | null {
    let obj = JSON.parse(window.localStorage.getItem("user")!);
    return obj as User;
  }

  setUser(user: any | null): void {
    if (user !== null) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }

  getRole(): UserType | undefined {
    return this.getUser()?.type;
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
