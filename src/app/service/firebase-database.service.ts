// firebase-database.service.ts
import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { Article } from '../models/article.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDatabaseService {
  private articlePath = 'articles/';
  private currentArticle: Article = {
    id: '',
    author: '',
    propicUrl: '',
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

  updateArticle2(): Promise<void> {
    // Aggiungi logica di validazione qui se necessario

    this.currentArticle.id = this.generateUniqueId();
    const db = getDatabase();
    return set(ref(db, `${this.articlePath}/${this.currentArticle.id}`), {
      ...this.currentArticle,
    });
  }

  updateArticle(newArticle: Article): Observable<void> {
    return from(this.updateArticleAsync(newArticle));
  }

  private async updateArticleAsync(newArticle: Article): Promise<void> {
    // Aggiungi logica di validazione qui se necessario
    newArticle.id = this.generateUniqueId();
    this.currentArticle = newArticle;

    const db = getDatabase();
    await set(ref(db, `${this.articlePath}/${this.currentArticle.id}`), {
      ...this.currentArticle,
    });
  }

  getAllArticles(): Observable<Article[]> {
    return new Observable((observer) => {
      const db = getDatabase();
      const articleRef = ref(db, this.articlePath);

      onValue(
        articleRef,
        (snapshot) => {
          const data = snapshot.val();
          const articles: Article[] = data ? Object.values(data) : [];

          observer.next(articles);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
