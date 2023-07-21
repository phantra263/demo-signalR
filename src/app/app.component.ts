import { Component, OnInit,NgZone  } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SignalRService } from './services/signalr.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

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

  listNoti: any = [];
  countNoti: number = 0;
  listData: any = [];
  isVisibleModal: boolean = false;
  tooltipVisible: boolean = false;
  filterParams: any = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: ''
  }

  constructor(
    public authService: AuthService,
    private signalRService: SignalRService,
    private ngZone: NgZone,
    private notifiSrv : NotificationService
    ) {}

  ngOnInit() {
    this.getListNoti();
    this.signalRService.startConnection();

    this.signalRService.addListener(data => {
      if (data.succeeded) {
        if ('readAll' in data.data) {
          // seen all
          if (data.data.readAll) {
            this.listNoti.forEach(item => {
              item.isRead = true;
            }) 
            this.countNoti = 0;
          } else {
            // seen only
            this.listNoti = this.listNoti.map((obj) => {
              if (obj.id === data.data.item.id) {
                return {
                   ...obj, 
                  isRead: true 
                };
              }
              return obj;
            });
            this.countNoti--;
          }
       
        } else {
          // push noti
          this.listNoti.unshift(data.data);
          this.countNoti++;
        }

        console.log(data);
        this.ngZone.run(() => {});
      }
    });
  }

  getListNoti() {
    this.notifiSrv.getListNoti(this.filterParams).toPromise().then(
      (response: any) => {
        this.countNoti = response.data[0].sL_ChuaXem;
        this.listNoti = response.data[0].items
      }
    );
  }

  fnSeen(id?) {
    const params =  {
      item: {
        id: id ? id : 0,
        isRead: true
      },
      readAll: id ? false : true
    }
    this.signalRService.sendFlagNoti(params)
    if (!id) this.isVisibleModal = false
  }
  
  ngLogout() {
    this.authService.logout();
  }

  handleNotificationCancel(): void {
    this.notificationDetail.isVisible = false;
  }

  handleCancelModal() {
    this.isVisibleModal = false;
  }

  handleOk() {
    this.isVisibleModal = false;
  }
  showModalAllNoti() {
    this.tooltipVisible = false;
    this.isVisibleModal = true;
  }
}
