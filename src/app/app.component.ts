import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { BackgroundColorClass } from './models/enum';
import { FirestoreAPIService } from './service/firestore-api.service';

const mainBgRoutes = ['/dashboard'];
const routesBgRoutes = ['/dashboard'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yggdrasill-angular';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private firestoreService: FirestoreAPIService<any>
  ) {}

  ngOnInit(): void {
    // Chiamata alla funzione per collegarsi all'emulatore Firestore
    this.firestoreService.connectToFirestoreEmulator();

    //TODO: capire cosa fare e pulire il resto
    Date.prototype.toJSON = function () {
      const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
      this.setHours(hoursDiff);
      return this.toISOString();
    };
  }

  getRouter(): Router {
    return this.router;
  }

  getApiService(): ApiService {
    return this.apiService;
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
