import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly AUTH_KEY = 'authenticationState';

  constructor(private cookieService: CookieService) {}

  setAuthState(authState: boolean): void {
    // Imposta il cookie con la data di scadenza alla fine della sessione del browser
    this.cookieService.setCookie(this.AUTH_KEY, authState.toString());
  }

  getAuthState(): boolean {
    const cookieValue = this.cookieService.getCookie(this.AUTH_KEY);
    return cookieValue === 'true'; // Converte la stringa "true" in un booleano
  }
}
