// article.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private temporaryArticle: any;
  private publishedArticles: any[] = [];

  setTemporaryArticle(article: any) {
    this.temporaryArticle = article;
  }

  showTemporaryArticle(): any {
    return this.temporaryArticle;
  }

  clearTemporaryArticle() {
    this.temporaryArticle = null;
  }

  publishArticle(article: any) {
    this.publishedArticles.push(article);
  }

  getPublishedArticles(): any[] {
    return this.publishedArticles || [];
  }
}
