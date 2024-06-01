import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { SocketIoService } from './socket-io.service';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { ChatContainerComponent } from "./chat-container/chat-container.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, ChatComponent, ChatContainerComponent, RouterLink, RouterLinkActive,CommonModule]
})

export class AppComponent {
  title = 'FrontendChat';
  messages : string[]  = []

  constructor(private socket: SocketIoService) { }


  ngOnInit() {
  }
}
