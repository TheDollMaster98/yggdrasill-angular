import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

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
import { ArticleEditorPage } from './components/editor/article-editor/article-editor.component';
import { WhoarePage } from './components/pages/whoare/whoare.page';
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { CarouselSectionComponent } from './components/carousel-section/carousel-section.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPage } from './components/pages/admin/admin.page';
import { BlogPage } from './components/pages/blog/blog.page';
import { ArticleService } from './service/article.service';
import { PodcastPage } from './components/pages/podcast/podcast.page';
import { EditorModule } from './components/editor/editor.module';
import { UpdatesComponent } from './components/pages/updates/updates.component';
import { DashboardWordpressComponent } from './components/wordpress/blog-wordpress/blog-wordpress.component';
import { AppRoutingModule } from './app-routing.module';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { LoginPage } from './components/pages/login/login.page';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TutorialCloudComponent } from './components/tutorial-cloud/tutorial-cloud.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { FirebaseModule } from './firebase/firebase.module';
import { IconModule } from './components/icon-component/icon.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GlitchClockComponent,
    DashboardPage,
    CarouselComponent,
    ComingsoonPage,
    WhiteLogoComponent,
    GdprComponent,
    PrivacyPolicyPage,
    WhoarePage,
    CarouselSectionComponent,
    AdminPage,
    BlogPage,
    PodcastPage,
    UpdatesComponent,
    DashboardWordpressComponent,
    MobileNavbarComponent,
    LoginPage,
    TutorialComponent,
    TutorialCloudComponent,
    PageNotFoundComponent,
    FileUploaderComponent,
  ],
  providers: [
    DashboardService,
    ArticleService,
    [
      {
        // provide: PlatformLocation,
        useClass: MockPlatformLocation,
      },
    ],
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FirebaseModule,
    EditorModule,
    IconModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    QuillModule,
  ],
})
export class AppModule {}
