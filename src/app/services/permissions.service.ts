import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; 

import { PermissionState } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate  {


  constructor(private registrationService: RegistrationService,
    
    private router: Router) { }


    canActivate(): Observable<boolean> | boolean {
      if (!this.registrationService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
    
      return this.registrationService.isAdmin().pipe(
        map((permissionState: PermissionState) => {
          if (permissionState.state) {
            return true;
          } else {
            this.router.navigate(['/accueil']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/accueil']);
          return of(false);
        })
      );
    }
  

}
