import { Injectable } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.2.173/notify')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then((data) => console.log('SignalR connection started.', data))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }

  addTransferChartDataListener(callback: (data: any) => void) {
    this.hubConnection.on('ReceiveNotification', data => {
      console.log('123213',data)
      callback(data);
    });
  }

 sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendNotification', user, message)
      .catch(err => console.error('Error while sending message: ', err));
 }
}