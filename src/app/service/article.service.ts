// article.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private temporaryArticle: any;

  setTemporaryArticle(article: any) {
    this.temporaryArticle = article;
  }

  getTemporaryArticle(): any {
    return this.temporaryArticle;
  }

  // clearTemporaryArticle() {
  //   this.temporaryArticle = null;
  // }
}
