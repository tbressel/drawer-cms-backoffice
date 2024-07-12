import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from '../../backoffice/notifications/notifications.component';
import { NotificationsService } from '../../services/notifications.service';
import { NavigationService } from '../../services/navigation.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NotificationsComponent, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  notificationMessage: string = '';
  isNotificationWindow: Boolean = false;
  isChoiceButtons: boolean = false;
  isLoading: Boolean = false;

  constructor(
    private notificationsService: NotificationsService,
    private navigationService: NavigationService,
    private registrationService: RegistrationService,
    private router: Router) { }

  ngOnInit(): void {
    this.notificationsService.displayNotification(this, 'is-logout', 0, '/accueil', 'client', true);

  }

  onCloseNotification(): void {
    this.isNotificationWindow = false;
    this.isChoiceButtons = false;
    this.notificationMessage = '';
    this.router.navigate(['/']);
  }

  onConfirmNotification(): void {

    this.registrationService.logout();
    
    // define the news states of the menu
    const menuStates: any = {
      isLogin: true,
      isSignin: true,
      isLogout: false,
      isAdmin: false
    };
    this.navigationService.updateMenuRightStates(menuStates);
    this.notificationsService.displayNotification(this, 'logout-success', 2000, '/accueil', 'client', false);
  }
}