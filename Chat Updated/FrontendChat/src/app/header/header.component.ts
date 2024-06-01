import { Component } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected onlineUsers = 0
  constructor(private client : SocketIoService) { }

  ngOnInit(): void {
    this.client.socket.on('users-refresh',(data) => {
      this.onlineUsers = data
    })
  }
}
