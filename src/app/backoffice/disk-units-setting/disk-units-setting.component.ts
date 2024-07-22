///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// Type model
import { DiskUnitModel } from '../../models/disk-unit.model';

// Service
import { DiskUnitService } from '../../services/disk-unit.service';
import { ReloadService } from '../../services/reload.service';
import { NotificationsService } from '../../services/notifications.service';


// Router COnfiguration
import { Router, RouteReuseStrategy } from '@angular/router';

import { NotificationsComponent } from '../notifications/notifications.component';


@Component({
  selector: 'app-disk-units-setting',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificationsComponent],
  templateUrl: './disk-units-setting.component.html',
  styleUrl: './disk-units-setting.component.scss'
})



export class DiskUnitsSettingComponent implements OnInit{

  // Attributes
  showDiskSection = false;

  label: string  ='';
  letter: string  ='';
  dataUnit: DiskUnitModel[] = [];


isNotificationWindow: boolean = false;
notificationMessage: string = '';

isLoading: Boolean = false;


  // Constructor
  constructor(private diskUnitService: DiskUnitService,
    private notificationsService: NotificationsService,
    private router: Router,
    private reload: ReloadService) { }


    /**
   * 
   * Method used to fetch the data menu. Initialized after the creation of the component
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.reload.reload$.subscribe(() => {
      this.diskUnitService.getAll().subscribe({
        next: (data: any) => {
          this.dataUnit = data.body;
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
  getArticlePropertyValue(article: DiskUnitModel, key: string): any {
    return article[key as keyof DiskUnitModel];
  }

  /**
   * Methode used to submit the form and add a new disk unit
   */
  submitForm(): void {
    this.isLoading = true;

    this.diskUnitService.create(this.label, this.letter).subscribe({
      next: (data: any) => {
        this.showDiskSection = false;
        this.label = '';
        this.letter = '';
        this.reload.triggerReload();    
        this.notificationsService.displayNotification(this, 'add-success', 2000, '/disk-unit-setting', 'client', false);

      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
       }
    });
  }

  /**
   * Methode used to delete an item
   * @param id 
   */
  deleteItem(id: number): void {
    this.isLoading = true;
    this.diskUnitService.delete(id).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'delete-success', 2000, '/disk-unit-setting', 'client', false);
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
  toggleDiskForm() {
    this.showDiskSection = !this.showDiskSection;
  }

}
