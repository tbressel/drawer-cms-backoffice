///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { HttpClient } from '@angular/common/http';

// Decorator
import { Injectable } from '@angular/core';

// Type model for async data
import { Observable } from 'rxjs';

// Model
import { NavigationModel } from '../models/navigation.model';

// Configuration
import { CONFIG } from '../../config';

// Decorator to inject the service in all components that need it
@Injectable({
    providedIn: 'root',
})


export class MenuSettingService {

    private token: string | null = null;

    // Constructor to inject the HttpClient
    constructor(private http: HttpClient) { }

    /**
     * 
     * Method used to fetch the data menu
     */
    getAll(): Observable<NavigationModel[]> {
        return this.http.get<NavigationModel[]>(`${CONFIG.baseUrl}/navigation/get-menu-items`);
    }


    /**
   * Methode used to submit the form
   */
    create(name: string): Observable<any> {
      const httpOptions = {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      };
        return this.http.post(`${CONFIG.baseUrl}/navigation/add-menu-item`, { name }, httpOptions);
    }


    /**
     * Methode used to delete a menu item
     */
    delete(id: number): Observable<any> {
        const httpOptions = {
            headers: {
              Authorization: `Bearer ${this.getToken()}`
            }
          };
        return this.http.delete(`${CONFIG.baseUrl}/navigation/delete-menu-item/${id}`, httpOptions);
    }

    /**
     * Methode used to move a menu item up
     */
    up(id: number): Observable<any> {
        const httpOptions = {
            headers: {
              Authorization: `Bearer ${this.getToken()}`
            }
          };
        return this.http.patch(`${CONFIG.baseUrl}/navigation/move-menu-item/${id}/?action=up`, {}, httpOptions);
    }

    /**
     * Methode used to move a menu item down
     * 
     */
    down(id: number): Observable<any> {
        const httpOptions = {
            headers: {
              Authorization: `Bearer ${this.getToken()}`
            }
          };
        return this.http.patch(`${CONFIG.baseUrl}/navigation/move-menu-item/${id}/?action=down`, {}, httpOptions);
    }    
    
    getToken(): string | null {
        const storage = typeof localStorage !== 'undefined' ? localStorage : null;
        return this.token || (storage ? storage.getItem('token') : null);
    
      }
   
}

