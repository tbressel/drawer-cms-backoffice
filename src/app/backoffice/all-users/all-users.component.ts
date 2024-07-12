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



@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})




export class AllUsersComponent implements OnInit {

  // Attributes
  dataAllUsers: UsersModel[] = [];


  // Constructor
  constructor(private router: Router,
    private usersService: UsersService,
    private reload: ReloadService) { }



  /**
   * Methode to get all articles
   * 
   */
  ngOnInit(): void {
    this.reload.reload$.subscribe(() => {

      this.usersService.getAll().subscribe({
        next: (data: any) => {
          this.dataAllUsers = data.body;
        },
        error: (error) => console.error(error)
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

    // toggle the isDisplay attribute
    user.isActivated = !user.isActivated;

    // Call the service and update the article
    this.usersService.isUserActivated(user.id_users, { isActivated: user.isActivated }).subscribe({
      next: (response) => {
        // console.log('Article mis à jour avec succès', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        user.isActivated = !user.isActivated;
      }
    });
  }


  selectUser(user: UsersModel): void {

    // Assurez-vous que `article` contient un champ `id` ou un champ similaire représentant l'identifiant unique de l'article.
    this.usersService.select(user.id_users).subscribe({
      next: (response) => {
        
        this.router.navigate([`/edit-user/${user.id_users}`]);

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    });
  }



  deleteUser(user: UsersModel): void {
    this.usersService.delete(user.id_users).subscribe({
      next: (data: any) => {
        this.reload.triggerReload();
        this.router.navigate(['/backoffice-main']);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    });
  }


}
