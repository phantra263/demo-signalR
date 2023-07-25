import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailNoti',
  templateUrl: './detailNoti.component.html',
  styleUrls: ['./detailNoti.component.scss']
})
export class DetailNotiComponent implements OnInit {
  @Input() detailNoti;

//   detailNoti: any = {
//     id: 258,
//     avatar: 'https://picsum.photos/200/300',
//     createAt: "2023-07-24T04:43:25.893",
//     content: "(push all) Cập nhật trạng thái của đơn tuyển xxxx",
//     senderId: "FC938DD7-F4ED-4CD0-A7AA-975BC0D06D67",
//     receiverId: "FC938DD7-F4ED-4CD0-A7AA-975BC0D06D67",
//     isRead: false,
//     firstName: "Phạm Công",
//     lastName: "Thẳng"
// }
  constructor() { }

  ngOnInit() {
  }

}
