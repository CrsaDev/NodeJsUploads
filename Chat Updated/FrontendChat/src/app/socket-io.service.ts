import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  public socket = io('http://localhost:3000');
  public id :any

  constructor() { 
    this.socket.on('connect',() => {
        this.id = this.socket.id
    })
  }
}