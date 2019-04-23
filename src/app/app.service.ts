import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AppService {

  isUserLoggedIn: string = sessionStorage.getItem('isUserLoggedIn');

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return of({ token: true });
  }

}
