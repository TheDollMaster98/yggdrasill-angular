// updates.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  currentUpdates: Update[] = [];
  futureUpdates: Update[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulazione di dati dal backend o da altre fonti
    this.currentUpdates = [
      {
        title: 'Lancio sito',
        content: 'Lanciato sito provvisorio su WordPress ed integrato qui.\n',
        date: '14/12/2023',
      },
    ];

    this.futureUpdates = [
      {
        title: 'Risoluzione bugfix grafici',
        content:
          'Stiamo lavorando alla risoluzioni di possibili bug di UX/UI lato mobile e desktop.',
        date: 'Prossimamente',
      },
      {
        title: 'Prossimo Grande Aggiornamento.',
        content:
          'Integrazione progressiva delle varie pagine presenti dal sito provvisorio a quello completo.\nPer farlo stiamo lavorando continuamente per migliorare la sicurezza del sito.',
        date: 'Prossimamente',
      },
      // Aggiungi più aggiornamenti futuri secondo necessità
    ];
  }
}

interface Update {
  title: string;
  content: string;
  date: string;
}
