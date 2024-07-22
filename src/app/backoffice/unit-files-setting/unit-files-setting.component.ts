///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Model
import { UnitFilesModel } from '../../models/unit-files.model';
import { DiskUnitModel } from '../../models/disk-unit.model';

// Services
import { UnitFilesService } from '../../services/unit-files.service';
import { DiskUnitService } from '../../services/disk-unit.service';
import { ReloadService } from '../../services/reload.service';
import { NotificationsService } from '../../services/notifications.service';


import { NotificationsComponent } from '../notifications/notifications.component';


interface DiskUnitField {

  id_disk_units: number;
  letter: string;
}

@Component({
  selector: 'app-unit-files-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationsComponent],
  templateUrl: './unit-files-setting.component.html',
  styleUrl: './unit-files-setting.component.scss'
})


export class UnitFilesSettingComponent implements OnInit {


  // Attributes
  dataAllFiles: UnitFilesModel[] = [];
  diskUnits: DiskUnitModel[] = [];
  selectedLetter: string = '';
  file: File | null = null;
  showForm = false;

  isNotificationWindow: boolean = false;
  notificationMessage: string = '';

  isLoading: Boolean = false;

  // Constructor
  constructor(private unitFilesService: UnitFilesService,
    private router: Router,
    private notificationsService: NotificationsService,
    private routeReuseStrategy: RouteReuseStrategy,
    private diskUnitService: DiskUnitService,
    private reload: ReloadService) { }


  /**
   * Methode to get all articles
   * 
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.reload.reload$.subscribe(() => {

      this.unitFilesService.getFiles().subscribe({
        next: (data: any) => {
          this.dataAllFiles = data.body;
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          const message = error.error?.message || 'An error occurred';
          this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
        }
      });

      this.diskUnitService.getAll().subscribe({
        next: (data: any) => {
          this.diskUnits = data.body;
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
  getArticlePropertyValue(article: UnitFilesModel, key: string): any {
    return article[key as keyof UnitFilesModel];
  }


  /**
   * Method to send the form to add a new item
   */
  submitForm(): void {
    this.isLoading = true;

    if (this.file) {
      const formData = new FormData();
      formData.append('id_disk_units', this.selectedLetter);
      formData.append('file', this.file);


      this.unitFilesService.create(formData).subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.reload.triggerReload();
          this.notificationsService.displayNotification(this, 'add-success', 2000, '/unit-files-setting', 'client', false);
        },
        error: (error: any) => {
          this.isLoading = false;
          const message = error.error?.message || 'An error occurred';
          this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
        }
      });
    } else {
      this.isLoading = false;
      this.notificationsService.displayNotification(this, 'add-file-failure', 2000, '/unit-files-setting', 'client', false);
    }
    this.isLoading = false;
  }

/**
 * Method to delete a file
 * @param file 
 */
  deleteFile(file: UnitFilesModel): void {
    this.isLoading = true;

    this.unitFilesService.delete(file.id_files).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'delete-success', 2000, '/unit-files-setting', 'client', false);

      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
      }    });
  }



  /**
 * Methode used to toggle the add entrie form
 */
  toggleForm() {
    this.showForm = !this.showForm;
  }

  getFilePropertyValue(file: UnitFilesModel, key: string): any {
    return file[key as keyof UnitFilesModel];
  }

/**
 * Method to toggle the display of a file
 * @param file 
 */
  toggleDisplayFile(file: UnitFilesModel): void {
    this.isLoading = true;

    // toggle the isDisplay attribute
   file.isDisplay = !file.isDisplay;

    // Call the service and update the article
    this.unitFilesService.isDisplayed(file.id_files, { isDisplay: file.isDisplay }).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'display-success', 2000, '/unit-files-setting', 'client', false);
      },
      error: (error: any) => {
        file.isDisplay = !file.isDisplay;
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
      }
    });
  }


  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }



}
