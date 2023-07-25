import { Injectable } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public notiReceived: Subject<string> = new Subject<string>();
  public listNoti: string[] = [];

  public startConnection(): void {
    const user = JSON.parse(localStorage.getItem('ttsuser'));
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://192.168.2.173/hub?UserId=${user.id}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection started.');
      })
      .catch(err => console.log('Error while starting SignalR connection: ' + err));
  }

  addListener(callback: (data: any) => void) {
    this.hubConnection.on('ReceiveNotification', data => {
      callback(data);
    });
  }

  startConnectChat(): void {
    const user = JSON.parse(localStorage.getItem('ttsuser'));
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://192.168.2.173/chat?UserId=${user.id}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Connect Chat started.');
      })
      .catch(err => console.log('Error while starting SignalR connection: ' + err));
  }

  sendMessage(noti): void {
      this.hubConnection.invoke('SendToAll', noti)
        .catch(err => console.error('Error while sending message: ', err));
  }

  sendMessageObject(noti): void {
    this.hubConnection.invoke('SendToMultiReceiver', noti)
      .catch(err => console.error('Error while sending message: ', err));
  }

  sendFlagNoti(noti): void {
    this.hubConnection.invoke('UpdateNotification', noti)
      .catch(err => console.error('Error while sending message: ', err));
  }
}