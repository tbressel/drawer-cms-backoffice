import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  @Input() notificationMessage!: string;
  @Input() isChoiceButtons!: boolean;
  @Output() closeNotification: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmNotification: EventEmitter<void> = new EventEmitter<void>();


  isNotificationWindow: Boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private notificationsService: NotificationsService) { }


  onChoice(choice: boolean): void {
    if (choice) {
      this.confirmNotification.emit();
    } else {
      this.closeNotification.emit();
    }

  }
}