import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  
  constructor(protected chat : ChatService,protected client : SocketIoService) { }
}
