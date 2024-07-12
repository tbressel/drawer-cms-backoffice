///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular importations
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs importations
import { Observable, of, BehaviorSubject } from 'rxjs';

// Model
import { NavigationModel } from './../models/navigation.model';
import { MenuRightStates } from './../models/navigation.model';

// Configuration
import { CONFIG } from '../../config';

// Decorator to inject the service in all components that need it
@Injectable({
  providedIn: 'root',
})


export class NavigationService {


  // Right menu default states
  private defaultMenuRightStates: MenuRightStates = {
    isLogin: true,
    isSignin: true,
    isLogout: false,
    isAdmin: false
  };

  // Emit the menu right new states
  private menuRightStatesSubject = new BehaviorSubject<MenuRightStates>(this.defaultMenuRightStates);
  menuRightStates$ = this.menuRightStatesSubject.asObservable();

  // Constructor
  constructor(private http: HttpClient) {}


/**
 * 
 * Method to get the navigation items
 * 
 * @returns 
 */
  getNavigationItems(): Observable<NavigationModel[]> {
    return this.http.get<NavigationModel[]>(`${CONFIG.baseUrl}/navigation/get-admin-menu-items`);
  }

  /**
   * 
   * Method to get the menu right states
   * 
   * @returns 
   */
  getMenuRightStates(): Observable<MenuRightStates> {
    return of(this.defaultMenuRightStates);
  }

  /**
   * 
   * Method to update the menu right states
   * 
   * @param newStates 
   */
  updateMenuRightStates(newStates: MenuRightStates): void {
    this.menuRightStatesSubject.next(newStates);
  }

}