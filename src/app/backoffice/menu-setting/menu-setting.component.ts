///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Decorator
import { Component } from '@angular/core';

// // Initialisation component method
import { OnInit } from '@angular/core';

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





export class MenuSettingComponent implements OnInit {

  // Attributes
  showForm: boolean = false;
  name: string = '';
  dataMenu: NavigationModel[] = [];
 


isNotificationWindow: boolean = false;
notificationMessage: string = '';

isLoading: Boolean = false;


  // Constructor
  constructor(private menuSettingService: MenuSettingService,
    private notificationsService: NotificationsService,
    private router: Router,
    private routeReuseStrategy: RouteReuseStrategy,
    private reload: ReloadService) { }


  /**
 * 
 * Method used to fetch the data menu. Initialized after the creation of the component
 */
  ngOnInit(): void {
    this.isLoading = true;
    this.reload.reload$.subscribe(() => {
      this.menuSettingService.getAll().subscribe({
        next: (data: any) => {
          this.dataMenu = data.body;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
         }
      });

    });
    this.reload.triggerReload();

  }


  /**
   * 
   * Methode to navigate to the article details
   * 
   * @param article 
   * @param key 
   * @returns 
   */
  getArticlePropertyValue(article: NavigationModel, key: string): any {
    return article[key as keyof NavigationModel];
  }

/**
 * Method to submit the form to add a new item
 * 
 */
  submitForm(): void {
    this.isLoading = true;
    this.menuSettingService.create(this.name).subscribe({
      next: (data: any) => {
        this.showForm = false;
        this.name = '';
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'add-success', 2000, '/menu-setting', 'client', false);
      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
       }
    });
  }


  /**
   * 
   * Method to delete an item
   * 
   * @param id 
   */
  deleteItem(id: number): void {
    this.isLoading = true;
    this.menuSettingService.delete(id).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'delete-success', 2000, '/menu-setting', 'client', false);
      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
      }
    });
  }

/**
 * 
 * Method to move an item up
 * 
 * @param id 
 */
  upItem(id: number): void {
    this.isLoading = true;
    this.menuSettingService.up(id).subscribe({
      next: (data: any) => {

        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/menu-setting']);
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
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
    this.isLoading = true;
    this.menuSettingService.down(id).subscribe({
      next: (data: any) => {
        // Force route reload
        this.reload.triggerReload();
        this.router.navigate(['/menu-setting']);
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
      }
    });
  }

  /**
   * Methode used to toggle the add entrie form
   */
  toggleForm() {
    this.showForm = !this.showForm;
  }







}
