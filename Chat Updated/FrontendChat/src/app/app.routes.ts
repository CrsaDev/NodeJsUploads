import { Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'About', component: AboutPageComponent },
    { path: 'Chat', component: ChatComponent },
  ];
