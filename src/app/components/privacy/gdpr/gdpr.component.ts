import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent implements OnInit {
  public showNotification = false;
  public accepted = false;

  constructor() {}

  ngOnInit(): void {
    // Controlla se l'utente ha già accettato i cookie
    const userAcceptedCookies = localStorage.getItem('userAcceptedCookies');
    if (userAcceptedCookies === 'true') {
      this.accepted = true;
      this.showNotification = false;
    } else {
      this.showNotification = true;
    }
  }

  acceptCookies() {
    // Memorizza il consenso dell'utente
    localStorage.setItem('userAcceptedCookies', 'true');
    this.accepted = true;
    this.showNotification = false;
  }

  rejectCookies() {
    // L'utente ha rifiutato i cookie, puoi gestire questa scelta qui
    this.showNotification = false;
  }
}
