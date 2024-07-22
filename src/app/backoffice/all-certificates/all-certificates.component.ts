///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouteReuseStrategy } from '@angular/router';

// Model
import { CertificatesListModel } from '../../models/certificate.models';

// Services
import { CertificateService } from '../../services/certificate.service';
import { NotificationsService } from '../../services/notifications.service';
import { ReloadService } from '../../services/reload.service';


import { NotificationsComponent } from '../notifications/notifications.component';



@Component({
  selector: 'app-all-certificates',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './all-certificates.component.html',
  styleUrl: './all-certificates.component.scss'
})
export class AllCertificatesComponent implements OnInit {
 // Attributes
 dataAllArticles: CertificatesListModel[] = [];
 token: string | null = '';


 isNotificationWindow: boolean = false;
notificationMessage: string = '';

isLoading: Boolean = false;

 // Constructor
 constructor(private certificateService: CertificateService,
  private notificationsService: NotificationsService,
   private router: Router,
   private routeReuseStrategy: RouteReuseStrategy,
   private reload: ReloadService,
   @Inject(PLATFORM_ID) private platformId: Object) { }



 /**
  * Methode to get all articles
  * 
  */
 ngOnInit(): void {
   
   // Local storage access only if the platform is the browser (not the server)
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }

    if (!this.token) {
      this.notificationsService.displayNotification(this, 'login-need', 3000, '/admin', 'client', false);
      return;
    }
    
    
    this.isLoading = true;
     this.certificateService.getAll(this.token).subscribe({
       next: (data: any) => {
         this.dataAllArticles = data.body;
         this.isLoading = false;
       },
       error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
      this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
       }      });
 
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
 getArticlePropertyValue(article: CertificatesListModel, key: string): any {
   return article[key as keyof CertificatesListModel];
 }

/**
 * 
 * Method to delete a certificate
 * 
 * @param id 
 */
 deleteCertificate(id: number): void {
  
  this.certificateService.delete(id, this.token).subscribe({
    next: (data: any) => {
      this.isLoading = false;
      this.reload.triggerReload();
      this.notificationsService.displayNotification(this, 'delete-success', 2000, '/all-certificates', 'client', false);

    },
    error: (error: any) => {
      this.isLoading = false;
      const message = error.error?.message || 'An error occurred';
    this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
     } 
  });
}



}
