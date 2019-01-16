import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket: Socket) { }

  getApps() {
    return this.socket.fromEvent('getApps');
  }

  updateStatus() {
    return this.socket.fromEvent('updateStatus');
  }

  removeApp(id: number, callback) {
    this.socket.emit('removeApp', id, callback);
  }

  addApp(newApp) {
    this.socket.emit('addApp', newApp);
  }

  getApp(id) {
    this.socket.emit('getApp', id);
  }

  returnApp() {
    return this.socket.fromEvent('returnApp');
  }
}
