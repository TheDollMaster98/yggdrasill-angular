// session.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly AUTH_KEY = 'authenticationState';

  setAuthState(authState: boolean): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authState));
  }

  getAuthState(): boolean {
    const storedAuthState = localStorage.getItem(this.AUTH_KEY);
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  }
}
