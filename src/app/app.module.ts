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
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { DashboardService } from './service/dashboard.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ComingsoonPage } from './components/pages/comingsoon/comingsoon.component';
import { WhiteLogoComponent } from './components/icon-component/white-logo/white-logo.component';
import { InstagramLinkComponent } from './components/icon-component/instagram-link/instagram-link.component';
import { LinkedinLinkComponent } from './components/icon-component/linkedin-link/linkedin-link.component';
import { TiktokLinkComponent } from './components/icon-component/tiktok-link/tiktok-link.component';
import { YoutubeLinkComponent } from './components/icon-component/youtube-link/youtube-link.component';
import { environment } from 'src/environments/environment';
import { GdprComponent } from './components/privacy/gdpr/gdpr.component';
import { PrivacyPolicyPage } from './components/privacy/privacy-policy/privacy-policy.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticleEditorPage } from './components/editor/article-editor/article-editor.component';
import { WhoarePage } from './components/pages/whoare/whoare.page';
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { CarouselSectionComponent } from './components/carousel-section/carousel-section.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPage } from './components/pages/admin/admin.page';
import { BlogPage } from './components/pages/blog/blog.page';
import { ArticlePreviewComponent } from './components/editor/article-preview/article-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlitchClockComponent,
    DashboardPage,
    CarouselComponent,
    ComingsoonPage,
    WhiteLogoComponent,
    InstagramLinkComponent,
    LinkedinLinkComponent,
    TiktokLinkComponent,
    YoutubeLinkComponent,
    GdprComponent,
    PrivacyPolicyPage,
    ArticleEditorPage,
    WhoarePage,
    CarouselSectionComponent,
    AdminPage,
    BlogPage,
    ArticlePreviewComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    // QuillModule.forRoot({
    //   customOptions: [
    //     {
    //       import: 'formats/font',
    //       whitelist: [
    //         'mirza',
    //         'roboto',
    //         'aref',
    //         'serif',
    //         'sansserif',
    //         'monospace',
    //       ],
    //     },
    // ],
    // readOnly: false,
    // scrollingContainer: null,
    // }),
  ],
  providers: [
    DashboardService,
    [
      {
        provide: PlatformLocation,
        useClass: MockPlatformLocation,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
