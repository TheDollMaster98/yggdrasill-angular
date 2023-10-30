import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private apiUrl = environment.countdown;

  constructor(private http: HttpClient) {}

  // Effettua la chiamata API per ottenere il countdown personalizzato
  getCountdown(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }
}
