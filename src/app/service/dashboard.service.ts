import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  contDownTime: string = '10';

  constructor(private cookieService: CookieService) {}

  // Aggiungi un metodo per ottenere il conto alla rovescia memorizzato nei cookie
  getStoredCountdown(): string | null {
    return this.cookieService.getCookie('countdown') || null;
  }

  // Aggiungi un metodo per salvare il conto alla rovescia nei cookie
  storeCountdown(countdown: string) {
    this.cookieService.setCookie('countdown', countdown);
  }
}
