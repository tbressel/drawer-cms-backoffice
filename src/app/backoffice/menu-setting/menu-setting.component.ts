///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Decorator
import { Component } from '@angular/core';

// // Initialisation component method
// import { OnInit } from '@angular/core';

// Type model
import { NavigationModel } from '../../models/navigation.model';

// Service
import { MenuSettingService } from '../../services/menu-setting.service';
import { ReloadService } from '../../services/reload.service';
import { NotificationsService } from '../../services/notifications.service';

// Router COnfiguration
import { Router, RouteReuseStrategy } from '@angular/router';

import { NotificationsComponent } from '../notifications/notifications.component';




@Component({
  selector: 'app-menu-setting',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificationsComponent],
  templateUrl: './menu-setting.component.html',
  styleUrl: './menu-setting.component.scss'
})





export class MenuSettingComponent {

  // Attributes
  showForm = false;
  name: string = '';
  dataMenu: NavigationModel[] = [];



isNotificationWindow = false;
notificationMessage: string = '';



  // Constructor
  constructor(private menuSettingService: MenuSettingService,
    private notificationServices: NotificationsService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy,
    private reload: ReloadService) { }


  /**
 * 
 * Method used to fetch the data menu. Initialized after the creation of the component
 */
  ngOnInit(): void {
    this.reload.reload$.subscribe(() => {
      this.menuSettingService.getAll().subscribe({
        next: (data: any) => {
          this.dataMenu = data.body;
        },
        error: (error) => {
          error =  error.error.message;
          this.showNotification(true, error, 3000, null, 'server');
         }
      });

    });
    this.reload.triggerReload();

  }

  submitForm(): void {
    this.menuSettingService.create(this.name).subscribe({
      next: (data: any) => {
        this.showForm = false;
        this.name = '';
        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);

      },
      error: (error) => {
        error =  error.error.message;
        this.showNotification(true, error, 3000, null, 'server');
       }
    });
  }

  deleteItem(id: number): void {
    this.menuSettingService.delete(id).subscribe({
      next: (data: any) => {
        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => {
        error =  error.error.message;
        this.showNotification(true, error, 3000, null, 'server');
       }
    });
  }


  upItem(id: number): void {
    this.menuSettingService.up(id).subscribe({
      next: (data: any) => {

        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => {
        error =  error.error.message;
        this.showNotification(true, error, 3000, null, 'server');
       }
    });
  }

/**
 * 
 * Method to move an item down
 * 
 * @param id 
 */
  downItem(id: number): void {
    this.menuSettingService.down(id).subscribe({
      next: (data: any) => {
        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => {
       error =  error.error.message;
       this.showNotification(true, error, 3000, null, 'server');
      }
    });
  }




  /**
   * Methode used to toggle the add entrie form
   */
  toggleForm() {
    this.showForm = !this.showForm;
  }



  /**
  * 
  * Methode to show a notification
  * 
  * @param display active or not the notification selected by ngIf in html
  * @param type could be a key or a message
  * @param timer duration when the notification is displayed
  * @param redirect route to redirect after the notification is displayed
  * @param origin values to define witch type of error is displayed 'client'(key) or 'server'(value) 
  */
  showNotification(display: boolean, type: string, timer: number = 0, redirect?: string | null, origin?: string) {

    // Most of time set to true to display the notification
    this.isNotificationWindow = display;

    if (origin === 'client' || origin === undefined) {
      this.notificationMessage = this.notificationServices.getNotificationMessage(type);
    } else if (origin === 'server') {
      this.notificationMessage = type;
    }

    if (display && timer > 0) {
      setTimeout(() => {
        this.isNotificationWindow = false;

        if (redirect !== undefined || redirect !== null) {
          this.router.navigate([redirect]);
        }
      }, timer);
    }
  }




}
