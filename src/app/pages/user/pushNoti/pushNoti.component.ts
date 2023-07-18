import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-pushNoti',
  templateUrl: './pushNoti.component.html',
  styleUrls: ['./pushNoti.component.css']
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
      id: "4A62A822-0667-4E68-996A-501209321232",
      userName: "A013",
      email: "vinhhq@esuhai.com",
      roles: null,
      isVerified: false,
      firstName: "tra",
      lastName: "Phan",
      avatar: "/Avatars/vinhhq.jpg"
    },
    {
      id: "4A62A822-0667-4E68-996A-50120941231231",
      userName: "A013",
      email: "vinhhq@esuhai.com",
      roles: null,
      isVerified: false,
      firstName: "Nam",
      lastName: "Teest",
      avatar: "/Avatars/vinhhq.jpg"
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
  
  dataOnly: any = {};
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

  sendMessage(): void {
    this.signalRService.sendMessage('vinh', 'da gui');
  }
}
