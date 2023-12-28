// tutorial.component.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  id?: string;
  author?: string;
  genre?: string;
  articleTitle?: string;
  articleContent?: string;
  publishDate?: string;

  constructor(public firebaseDatabaseService: FirebaseDatabaseService) {}

  ngOnInit(): void {
    this.firebaseDatabaseService.getAllArticles();
  }

  writeUserData() {
    const currentArticle = this.firebaseDatabaseService.getCurrentArticle();

    this.firebaseDatabaseService
      .updateArticle()
      .then(() => {
        console.log('Articolo salvato con successo.');
        // Aggiungi logica aggiuntiva o aggiorna la vista se necessario
      })
      .catch((error) => {
        console.error("Errore durante il salvataggio dell'articolo:", error);
      });
  }
}
