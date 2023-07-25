import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  inputChat: string = '';

  time: string = '';
  dataSelected: any = {};
  hasConversation: boolean = false;
  messActive: any = {};
  constructor(
    private signalRService: SignalRService,
    private router: Router,
    private route: ActivatedRoute,
    private chatSrv: ChatService
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        // Do something with the "id" parameter
        this.hasConversation = true;
      }
    });
  }
}
