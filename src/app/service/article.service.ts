// article.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Article, ArticleList } from '../models/article.model';
import { FirebaseDatabaseService } from './firebase-database.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private temporaryArticle: Article | undefined;
  article: Article = new Article();
  submitted: boolean = false;

  constructor(private firebaseDbService: FirebaseDatabaseService) {}

  setTemporaryArticle(article: Article) {
    this.temporaryArticle = article;
  }

  showTemporaryArticle(): Article | undefined {
    return this.temporaryArticle;
  }

  saveArticle(): void {
    this.firebaseDbService
      .create(this.article)
      .then((docRef) => {
        console.log(
          'Created new article successfully! Document ID:',
          docRef.id
        );
        this.submitted = true;
      })
      .catch((error) => {
        console.error('Error creating new article:', error);
        // Gestisci l'errore come necessario, ad esempio mostrando un messaggio all'utente
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.article = new Article();
  }
}
