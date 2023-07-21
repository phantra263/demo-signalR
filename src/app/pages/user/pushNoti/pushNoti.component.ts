import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-pushNoti',
  templateUrl: './pushNoti.component.html',
  styleUrls: ['./pushNoti.component.scss']
})
export class PushNotiComponent implements OnInit {

  listData: any = [
    {
      id: "4A62A822-0667-4E68-996A-501209329832",
      userName: "A013",
      email: "vinhhq@esuhai.com",
      roles: null,
      isVerified: false,
      firstName: "Vinh",
      lastName: "Huỳnh Quang",
      avatar: "/Avatars/vinhhq.jpg"
    },
    {
      id: "FC938DD7-F4ED-4CD0-A7AA-975BC0D06D67",
      userName: "S602",
      email: "trapc@esuhai.com",
      roles: null,
      isVerified: false,
      firstName: "Trà",
      lastName: "Phan Công",
      avatar: "/Avatars/trapc.jpg"
  }
  ];
  

  listGroup: any = [
    {
      id: "4A62A822-0667-4E68-996A-501209329832",
      groupName: "ICT"
    },
    {
      id: "4A62A822-0667-4E68-996A-50120932983232",
      groupName: "TITD"
    },
    {
      id: "4A62A822-0667-4E68-996A-501209329822332",
      groupName: "RDD"
    },
  ];
  
  dataAnyUser: any = [];
  dataAnyGroup: any = [];
  constructor(private signalRService: SignalRService) {}

  
  ngOnInit() {
  }

  addDataAnyUser(value: string[]) {
    this.dataAnyUser = value;
  }

  addDataAnyGroup(value: string[]) {
    this.dataAnyGroup = value
  }

  sendMessageAll(): void {
    const user = JSON.parse(localStorage.getItem('ttsuser'));
    const dateCurrent = new Date();
    this.signalRService.sendMessage({
      firstName: user.firstName,
      lastName: user.lastName,
      SenderId: user.id,
      Content: '(push all) Cập nhật trạng thái của đơn tuyển xxxx',
      CreateAt: dateCurrent,
    });
  }

  sendMessageAny(): void {
    const user = JSON.parse(localStorage.getItem('ttsuser'));
    const dateCurrent = new Date();
    this.signalRService.sendMessageObject({
      firstName: user.firstName,
      lastName: user.lastName,
      SenderId: user.id,
      Content: '(push any)Cập nhật trạng thái của đơn tuyển xxxx',
      CreateAt: dateCurrent,
      ReceiverIds: this.dataAnyUser
    });
  }
}
