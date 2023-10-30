import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { GlitchClockComponent } from './components/glitch-clock/glitch-clock.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.page';
import { DashboardService } from './service/dashboard.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ComingsoonComponent } from './components/pages/comingsoon/comingsoon.component';
import { SocialLinksComponent } from './components/icon-component/social-links/social-links.component';
import { WhiteLogoComponent } from './components/icon-component/white-logo/white-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlitchClockComponent,
    DashboardComponent,
    CarouselComponent,
    ComingsoonComponent,
    SocialLinksComponent,
    WhiteLogoComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule],
  providers: [DashboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
