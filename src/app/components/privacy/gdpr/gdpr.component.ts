import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent implements OnInit {
  public showNotification = false;
  public accepted = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    // Controlla se l'utente ha già accettato i cookie
    const userAcceptedCookies = this.cookieService.getCookie(
      'userAcceptedCookies'
    );
    if (userAcceptedCookies === 'true') {
      this.accepted = true;
      this.showNotification = false;
    } else {
      this.showNotification = true;
    }
  }

  acceptCookies() {
    // Memorizza il consenso dell'utente utilizzando il servizio CookieService
    this.cookieService.setCookie('userAcceptedCookies', 'true');
    this.accepted = true;
    this.showNotification = false;
  }

  rejectCookies() {
    // L'utente ha rifiutato i cookie, puoi gestire questa scelta qui
    this.showNotification = false;
  }
}
