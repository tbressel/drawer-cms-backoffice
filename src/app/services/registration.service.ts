import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { LoginModel } from './../models/registration.model';
import { SigninModel } from './../models/registration.model';
import { CONFIG } from '../../config';


import { PermissionState } from '../models/permission.model';

@Injectable({
  providedIn: 'root',
})




export class RegistrationService {

  
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginModel[]> {
    const body = { username, password };
    return this.http.post<LoginModel[]>(`${CONFIG.baseUrl}/register/login?action=login`, body, { withCredentials: true }).pipe(
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return of({ success: true });
  }

  signin(username: string, password: string, email: string): Observable<SigninModel[]> {
    const body = { username, password, email };
    return this.http.post<SigninModel[]>(`${CONFIG.baseUrl}/register/signin?action=signin`, body, { withCredentials: true }).pipe(
    );
  }

  isAdmin(): Observable<PermissionState> {
    const token = this.getToken();
    if (!token) {
      // console.error('Token is missing.');
      return of({
        messageKey: 'user'
      , state: false});
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get<PermissionState>(`${CONFIG.baseUrl}/isadmin`, httpOptions);
  }


    getToken(): string | null {
      const storage = typeof localStorage !== 'undefined' ? localStorage : null;
      return this.token || (storage ? storage.getItem('token') : null);

    }



    
  isLoggedIn(): boolean {
    const storage = typeof localStorage !== 'undefined' ? localStorage : null;
    return !!this.token || (storage ? !!storage.getItem('token') : false);
  }

}
