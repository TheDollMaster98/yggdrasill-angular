import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BackgroundColorClass } from './models/enum';
import { FirestoreAPIService } from './service/firestore-api.service';
import { StorageService } from './service/storage.service';
import { SessionService } from './service/session.service';
import { AuthService } from './service/auth.service';

const mainBgRoutes = ['/dashboard'];
const routesBgRoutes = ['/dashboard'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yggdrasill-angular';
  authenticatedUserName: string | null = null;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private firestoreService: FirestoreAPIService<any>,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Connessione agli emulatori Firestore e Storage
    this.firestoreService.connectToFirestoreEmulator();
    this.storageService.connectToStorageEmulator();

    // Recupero dello stato di autenticazione
    this.sessionService.getAuthState();

    // Recupero del nome di chi ha effettuato l'accesso
    this.authService.getAuthName().subscribe({
      next: (authName) => {
        this.authenticatedUserName = authName;
      },
      error: (error) => {
        console.error('Errore durante il recupero del nome utente:', error);
      },
    });

    // Modifica del comportamento di toJSON per le date
    Date.prototype.toJSON = function () {
      const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
      this.setHours(hoursDiff);
      return this.toISOString();
    };
  }

  getMainBackgroundColorClass() {
    return mainBgRoutes.includes(this.router.url)
      ? BackgroundColorClass.DayMode
      : BackgroundColorClass.NightMode;
  }

  getRoutesBackgroundColorClass() {
    return routesBgRoutes.includes(this.router.url)
      ? BackgroundColorClass.DayMode
      : BackgroundColorClass.NightMode;
  }

  isDayMode(): boolean {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  }

  shouldApplyMinHeight(): boolean {
    // Aggiungi la logica per determinare se applicare o meno l'altezza minima
    // Ad esempio, verifica la lunghezza del contenuto o altri criteri

    // Esempio: applica l'altezza minima solo se il contenuto è più corto di 100 pixel
    const contentElement = document.querySelector('.main-content'); // Assuming you have a class named 'main-content' on the content element
    const contentHeight = contentElement ? contentElement.clientHeight : 0;

    return contentHeight < 100;
  }
}
