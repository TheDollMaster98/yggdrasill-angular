// tutorial.service.ts
import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from 'firebase/database';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private articlePath = 'articles/';

  // Stato dell'articolo
  private currentArticle: Article = {
    id: '',
    author: '',
    genre: '',
    articleTitle: '',
    articleContent: '',
    publishDate: '',
  };

  getCurrentArticle(): Article {
    return this.currentArticle;
  }

  setCurrentArticle(article: Article): void {
    this.currentArticle = article;
  }

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return timestamp + randomPart;
  }

  writeUserData(): Promise<void> {
    // Aggiungi logica di validazione qui se necessario

    this.currentArticle.id = this.generateUniqueId();
    const db = getDatabase();
    return set(ref(db, `${this.articlePath}/${this.currentArticle.id}`), {
      ...this.currentArticle,
    });
  }
}
