import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SignalRService } from './services/signalr.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isCollapsed = false;
  jwtHelper = new JwtHelperService();
  currUser: any;
  version: any = environment.infoApp.version;

  notificationDetail: any = {
    isVisible: false,
    title: '',
    content: '',
    created: null,

    id: 0,
    isRead: null,
    isReadUrl: null,
    ghiChu: null
  }

  langVisible: boolean = false;
  countNoti: number = 0;
  listNoti: any = [];

  constructor(
    public authService: AuthService,
    private signalRService: SignalRService) {}

  ngOnInit() {
    // handle notify signalR
    this.signalRService.startConnection();

    this.signalRService.addTransferChartDataListener(data => {
      if (data) {
        this.listNoti.push(data);
        this.countNoti++;
      }
    });
  }
  
  ngLogout() {
    this.authService.logout();
  }
  

  handleNotificationCancel(): void {
    this.notificationDetail.isVisible = false;
  }
}
