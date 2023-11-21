// article-list.component.ts

import { Component } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  // Dati di esempio, sostituiscili con i dati reali
  articles: any[];

  constructor(private articleService: ArticleService) {
    this.articles = this.articleService.getPublishedArticles();
    // this.articles = this.articleService.showTemporaryArticle();
  }
}
