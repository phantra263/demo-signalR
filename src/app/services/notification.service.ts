import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: Subject<any> = new Subject<any>();

  notify(data: any) {
    this.notificationSubject.next(data);
  }

  getNotificationObservable() {
    return this.notificationSubject.asObservable();
  }
}