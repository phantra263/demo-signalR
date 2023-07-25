import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-listNoti',
  templateUrl: './listNoti.component.html',
  styleUrls: ['./listNoti.component.scss']
})
export class ListNotiComponent implements OnInit {

  filterParams: any = {
    PageNumber: 1,
    PageSize: 10,
    Keyword: ''
  }
  listNoti: any = [];
  listNotiNotSeen: any = [];
  totalItems: number = 0;
  dataSelectAll: boolean = false;
  notiSelected: {};
  isShowDetail: boolean = false;

  constructor(
    private notifiSrv : NotificationService
  ) { }

  ngOnInit() {
    this.getListNoti();
  }

  getListNoti() {
    this.notifiSrv.getListNoti(this.filterParams).subscribe(
      (response: any) => {
        this.listNoti = response.data[0].items;
        this.totalItems = this.listNoti.length;
        this.listNotiNotSeen = this.listNoti.filter(item => !item.isRead);
      }
    );
 }

 openNoti(noti) {
  this.isShowDetail = true;
  this.notiSelected = noti;
 }
}
