import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { User } from '../../../auth/model/user';
import { AxiosService } from '../../../axios.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        // "Authorization": "Bearer " + this.axiosService.getAuthToken()
     }),
  };

  constructor(private http: HttpClient, private axiosService: AxiosService) {}

  updateUser(User: User): Observable<User> {
    return this.http
      .put<User>(this.url + '/account/' + User.email, User, this.httpOptions)
      .pipe(catchError(this.handleError<User>(`updateUser`)));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
