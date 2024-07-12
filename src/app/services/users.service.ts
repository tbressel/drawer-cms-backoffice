///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////


// Modules
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Decorator
import { Injectable } from '@angular/core';

// Model
import { UsersModel } from "../models/users.model"

// Base Url Configuration
import { CONFIG } from '../../config';

// Type model for async data
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})



export class UsersService {

  private token: string | null = null;

  // Constructor to inject the HttpClient
  constructor(private http: HttpClient) { }



  /**
   * 
   * Method to get all users
   * 
   * @returns 
   */
  getAll(): Observable<UsersModel[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    };
    return this.http.get<UsersModel[]>(`${CONFIG.baseUrl}/users-list/`, httpOptions);
  }


  isUserActivated(id: number, updateData: { isActivated: boolean }): Observable<any> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    };
    return this.http.patch(`${CONFIG.baseUrl}/users/is-activated/${id}`, updateData, httpOptions);
  }


  select(id: number): Observable<any> {

    return this.http.get(`${CONFIG.baseUrl}/users/select-user/${id}`);

  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${CONFIG.baseUrl}/users/delete/${id}`);

  }

  getToken(): string | null {
    const storage = typeof localStorage !== 'undefined' ? localStorage : null;
    return this.token || (storage ? storage.getItem('token') : null);

  }

}
