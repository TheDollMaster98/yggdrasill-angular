import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private authToken: string | null = null;

  constructor() {
    // Inizializza la connessione WebSocket
    this.socket$ = webSocket('wss://example.com/socket');

    // Recupera il token WebSocket salvato in localStorage
    this.authToken = localStorage.getItem('websocket_token');

    // Esegui l'autenticazione se il token è disponibile
    if (this.authToken) {
      this.authenticateWebSocket(this.authToken);
    }
  }

  send(message: any) {
    // Invia un messaggio al server WebSocket
    this.socket$.next(message);
  }

  receive() {
    // Restituisce un'osservabile per ricevere messaggi dal server WebSocket
    return this.socket$;
  }

  // Esempio di autenticazione WebSocket
  authenticateWebSocket(token: string) {
    // Effettua l'autenticazione WebSocket con il token
    // Sostituisci con la tua logica di autenticazione
    this.socket$.next({ type: 'authenticate', token });

    // Salva il token WebSocket in localStorage
    this.saveWebSocketToken(token);
  }

  // Esempio di salvataggio del token WebSocket in localStorage
  saveWebSocketToken(token: string) {
    localStorage.setItem('websocket_token', token);
    this.authToken = token;
  }
}
