// tutorial.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  id?: string;
  author!: string;
  genre?: string;
  articleTitle?: string;
  articleContent?: string;
  publishDate?: string;

  constructor(
    public firebaseDatabaseService: FirebaseDatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.firebaseDatabaseService.getAllArticles();
  }

  setNewDisplayName(): void {
    if (this.author.trim() !== '') {
      this.authService.setCurrentUserName(this.author).subscribe(
        () => {
          console.log('Nome utente impostato con successo.');
        },
        (error) => {
          console.error(
            "Errore durante l'impostazione del nome utente:",
            error
          );
        }
      );
    } else {
      console.error('Il nuovo nome utente non può essere vuoto.');
    }
  }

  writeUserData() {
    const currentArticle = this.firebaseDatabaseService.getCurrentArticle();

    this.firebaseDatabaseService
      .updateArticle2()
      .then(() => {
        console.log('Articolo salvato con successo.');
        // Aggiungi logica aggiuntiva o aggiorna la vista se necessario
      })
      .catch((error) => {
        console.error("Errore durante il salvataggio dell'articolo:", error);
      });
  }
}
