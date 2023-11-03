import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

// angular firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { NavbarComponent } from './components/navbar/navbar.component';
import { GlitchClockComponent } from './components/glitch-clock/glitch-clock.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.page';
import { DashboardService } from './service/dashboard.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ComingsoonComponent } from './components/pages/comingsoon/comingsoon.component';
import { WhiteLogoComponent } from './components/icon-component/white-logo/white-logo.component';
import { InstagramLinkComponent } from './components/icon-component/instagram-link/instagram-link.component';
import { LinkedinLinkComponent } from './components/icon-component/linkedin-link/linkedin-link.component';
import { TiktokLinkComponent } from './components/icon-component/tiktok-link/tiktok-link.component';
import { YoutubeLinkComponent } from './components/icon-component/youtube-link/youtube-link.component';

const firebaseConfig = {
  apiKey: 'AIzaSyA754pPbe9v4WR5yVmhehmOulTGJTi-HIQ',
  authDomain: 'yggdrasill-project.firebaseapp.com',
  databaseURL:
    'https://yggdrasill-project-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'yggdrasill-project',
  storageBucket: 'yggdrasill-project.appspot.com',
  messagingSenderId: '780116050986',
  appId: '1:780116050986:web:e63a4c6e4c11efb747ef53',
  measurementId: 'G-0SB1BB90X4',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlitchClockComponent,
    DashboardComponent,
    CarouselComponent,
    ComingsoonComponent,
    WhiteLogoComponent,
    InstagramLinkComponent,
    LinkedinLinkComponent,
    TiktokLinkComponent,
    YoutubeLinkComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    NgbModule,
    HttpClientModule,
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
