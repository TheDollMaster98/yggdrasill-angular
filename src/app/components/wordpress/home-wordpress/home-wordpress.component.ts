import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-wordpress',
  templateUrl: './home-wordpress.component.html',
  styleUrls: ['./home-wordpress.component.scss'],
})
export class HomeWordpressComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  discoverMission() {
    // Puoi gestire la logica del pulsante qui
    console.log('Scopri la nostra mission è stato premuto!');

    // Esegui la navigazione alla pagina desiderata (ad esempio, '/comingsoon')
    this.router.navigate(['/chi-siamo']);
  }
}
