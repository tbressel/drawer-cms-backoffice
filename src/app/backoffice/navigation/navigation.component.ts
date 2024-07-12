// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Services imports
import { NavigationService } from '../../services/navigation.service';
import { RegistrationService } from '../../services/registration.service';

//Models imports
import { NavigationModel, MenuRightStates } from '../../models/navigation.model';

// Components imports
import { NotificationsComponent } from '../notifications/notifications.component';



@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NotificationsComponent, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  // Attributs
  leftMenuItems: NavigationModel[] = [];
  menuRightStates: MenuRightStates = new MenuRightStates();

  navigationOverlay: boolean = false;

  // Constructeur
  constructor(
    private navigationService: NavigationService,
    private registrationService: RegistrationService,
    private router: Router
  ) { }


  /**
   * Method to initialize the component
   */
  ngOnInit(): void {
    this.loadNavigationItems();
    this.initializeMenuRightStates();
    this.checkAdminStatus();
    // Subscribe to menuRightStates updates
    this.navigationService.menuRightStates$.subscribe(states => {
      this.menuRightStates = states;
      // console.log('Updated menuRightStates:', this.menuRightStates);
    });
  }


  /**
   * Method to load the navigation items
   */
  loadNavigationItems(): void {
    this.navigationService.getNavigationItems().subscribe({
      next: (data: any) => {
        this.leftMenuItems = data.body;
      },
      error: (error) => {
        console.error('Error fetching navigation items:', error);    
      }
    });
  }


  /**
   * Method to initialize the rigth menu states
   */
  initializeMenuRightStates(): void {
    this.navigationService.getMenuRightStates().subscribe({
      next: (states) => {
        this.menuRightStates = states;
      },
      error: (error) => {
        console.error('Error fetching menu right states:', error);
      }
    });
  }


  /**
   * Method to check if the user is an admin
   */
  checkAdminStatus(): void {
    this.registrationService.isAdmin().subscribe({
      next: (isAdmin:  any) => {

        // console.log('isAdmin dans naviogation compopnent', isAdmin);
        if (isAdmin) {
          this.menuRightStates.isAdmin = isAdmin.state;
          this.menuRightStates.isSignin = false;
          this.menuRightStates.isLogin = false;
          this.menuRightStates.isLogout = true;
          this.navigationService.updateMenuRightStates(this.menuRightStates);
        }
      },
      error: (error) => {
        console.error('Error checking admin status:', error);
      }
    });
  }
  


  closeOverlay(): void {
    this.navigationOverlay = false;

  }

  openOverlay(): void {
    this.navigationOverlay = true;

  }
}