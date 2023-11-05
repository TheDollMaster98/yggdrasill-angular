import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yggdrasill-angular';
  constructor() {}

  ngOnInit() {
    // Carica il file TXT come script personalizzato
    const script = document.createElement('script');
    script.src = 'assets/js/ads.txt';
    document.body.appendChild(script);
  }
}
