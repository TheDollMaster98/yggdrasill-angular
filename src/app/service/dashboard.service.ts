import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  contDownTime: string = '10';

  constructor() {}

  // Aggiungi un metodo per ottenere il conto alla rovescia memorizzato in localStorage
  getStoredCountdown(): string | null {
    return localStorage.getItem('countdown') || null;
  }

  // Aggiungi un metodo per salvare il conto alla rovescia in localStorage
  storeCountdown(countdown: string) {
    localStorage.setItem('countdown', countdown);
  }
}
