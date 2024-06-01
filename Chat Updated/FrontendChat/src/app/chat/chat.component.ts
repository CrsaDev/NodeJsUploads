import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,ChatContainerComponent,MatProgressSpinnerModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  protected matchedUser = ""
  protected chatMsg:string = ''
  protected isSearching:boolean = false;
  protected color = "#000"
  protected statusMsg = '';
  constructor(protected client : SocketIoService,protected chat : ChatService) { }

  ngOnInit(): void {
    this.client.socket.on('connection-created',(data) => {
      this.statusMsg=''
      this.matchedUser = data.id
    })

    this.client.socket.on('user-dc',(data) => {
      if(data.user == this.matchedUser) {
        this.statusMsg='Stranger has disconnected :('
        this.chat.messages = []
        this.matchedUser = ""
        this.isSearching = false
      }
    })

    this.client.socket.on('msg',(data) => {
      this.chat.messages.unshift(data)
      console.log(this.chat.messages)
      console.log('scrolling')
    })
  }

  /* Gestione invio */
  protected send() {
    const data = {sender:this.client.id,receiver:this.matchedUser,msg:this.chatMsg}
    this.client.socket.emit('user-msg',data)
    this.chat.messages.unshift(data)
  }

  /* Gestione disconnessione */
  protected disconnect() {
    this.client.socket.emit('user-disconnect',{user:this.client.id,paired:this.matchedUser})
    this.chat.messages = []
    this.matchedUser = ""
    this.isSearching = false;
  }

  /* Gestione ricerca */
  protected search() {
    this.isSearching = true;
    this.statusMsg = '';
    this.client.socket.emit('user-searching',{id:this.client.id}) //Di al server di essere in ricerca

  }
  
}

