import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  discoverMission() {
    // Puoi gestire la logica del pulsante qui
    console.log('Scopri la nostra mission è stato premuto!');

    // Esegui la navigazione alla pagina desiderata (ad esempio, '/comingsoon')
    this.router.navigate(['/chi-siamo']);
  }
}
