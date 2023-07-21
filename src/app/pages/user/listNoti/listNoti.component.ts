import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-listNoti',
  templateUrl: './listNoti.component.html',
  styleUrls: ['./listNoti.component.css']
})
export class ListNotiComponent implements OnInit {

  filterParams: any = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: ''
  }
  listNoti: any = [];

  constructor(
    private notifiSrv : NotificationService
  ) { }

  ngOnInit() {
    this.getListNoti();
  }

  getListNoti() {
    this.notifiSrv.getListNoti(this.filterParams).toPromise().then(
      (response: any) => {
        this.listNoti = response.data[0].items
      }
    );
 }
}
