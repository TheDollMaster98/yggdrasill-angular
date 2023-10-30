import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  constructor(private http: HttpClient) {}

  // Effettua la chiamata API per ottenere il countdown dei giorni
  getDayCountdown(): Observable<number> {
    return this.http.get<number>('/timer');
  }

  // Effettua la chiamata API per ottenere il countdown personalizzato
  getApiCountdown(): Observable<string> {
    return this.http.get<string>('/api/countdown');
  }
}
