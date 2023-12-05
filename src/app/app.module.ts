import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

// angular firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import {
  getFirestore,
  provideFirestore,
  FirestoreSettings,
} from '@angular/fire/firestore';
import {
  getDatabase,
  provideDatabase,
  Database,
  connectDatabaseEmulator,
} from '@angular/fire/database';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import {
//   provideFirebaseApp,
//   getApp,
//   initializeApp,
//   FirebaseAppModule,
// } from '@angular/fire/app';
// import {
//   FirestoreModule,
//   getFirestore,
//   provideFirestore,
// } from '@angular/fire/firestore';

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
import { ArticleService } from './service/article.service';
import { ArticleListComponent } from './components/editor/article-list/article-list.component';
import { PodcastPage } from './components/pages/podcast/podcast.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { EditorModule } from './components/editor/editor/editor.module';

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
    ArticleListComponent,
    PodcastPage,
  ],
  providers: [
    DashboardService,
    ArticleService,
    [
      {
        provide: PlatformLocation,
        useClass: MockPlatformLocation,
      },
    ],
    // // Inizializza l'app Firebase con la configurazione giusta.
    // {
    //   provide: 'FirebaseApp',
    //   useValue: initializeApp(environment.firebaseConfig),
    // },
    // // Restituisce un'istanza di Firestore
    // {
    //   provide: 'Firestore',
    //   useFactory: (firebaseApp: any, firestoreSettings: any) =>
    //     getFirestore(firebaseApp, firestoreSettings),
    //   deps: ['FirebaseApp', 'FirestoreSettingsToken'],
    // },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    // connectDatabaseEmulator,
    // AngularFireDatabaseModule,
    // FirestoreModule,
    // FirebaseAppModule,
    EditorModule,
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
