///////////////////////////////////////////////////////
////////////////////  IMPORTATIONS   //////////////////
///////////////////////////////////////////////////////

// Modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Model
import { UsersModel } from '../../models/users.model';

// Services
import { ReloadService } from '../../services/reload.service';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';


import { NotificationsComponent } from '../notifications/notifications.component';


@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})




export class AllUsersComponent implements OnInit {

  // Attributes
  dataAllUsers: UsersModel[] = [];


isNotificationWindow: boolean = false;
notificationMessage: string = '';

isLoading: Boolean = false;


  // Constructor
  constructor(private router: Router,
    private usersService: UsersService,
    private notificationsService: NotificationsService,    
    private reload: ReloadService) { }



  /**
   * Methode to get all articles
   * 
   */
  ngOnInit(): void {
    this.isLoading = true;

    this.reload.reload$.subscribe(() => {

      this.usersService.getAll().subscribe({
        next: (data: any) => {
          this.dataAllUsers = data.body;
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
   * @param user 
   * @param key 
   * @returns 
   */
  getUserPropertyValue(user: UsersModel, key: string): any {
    return user[key as keyof UsersModel];
  }

  /**
   * 
   * Methode to toggle between display and hide article
   *
   * @param user 
   */
  toggleActivateUser(user: UsersModel): void {

    this.isLoading = true;

    // toggle the isDisplay attribute
    user.isActivated = !user.isActivated;

    // Call the service and update the article
    this.usersService.isUserActivated(user.id_users, { isActivated: user.isActivated }).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'activate-success', 2000, '/all-users', 'client', false);
      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);

        user.isActivated = !user.isActivated;
      }
    });
  }


  // selectUser(user: UsersModel): void {

  //   // Assurez-vous que `article` contient un champ `id` ou un champ similaire représentant l'identifiant unique de l'article.
  //   this.usersService.select(user.id_users).subscribe({
  //     next: (response) => {
        
  //       this.router.navigate([`/edit-user/${user.id_users}`]);

  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
  //     }
  //   });
  // }


/**
 * Method to delete a user
 * @param user 
 */
  deleteUser(user: UsersModel): void {
    this.isLoading = true;

    this.usersService.delete(user.id_users).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.reload.triggerReload();
        this.notificationsService.displayNotification(this, 'ghost-success', 2000, '/all-users', 'client', false);

      },
      error: (error: any) => {
        this.isLoading = false;
        const message = error.error?.message || 'An error occurred';
        this.notificationsService.displayNotification(this, message, 2000, null, 'server', false);
      }
    });
  }


}
