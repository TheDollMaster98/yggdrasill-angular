// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article, ArticleList } from 'src/app/models/article.model';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  currentArticle?: Article;
  currentIndex = -1;

  constructor(
    private articleService: ArticleService,
    private firebaseDatabaseService: FirebaseDatabaseService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  refreshList(): void {
    this.currentArticle = undefined;
    this.currentIndex = -1;
    this.loadArticles();
  }

  loadArticles(): void {
    console.log('Inizio caricamento degli articoli');

    // Utilizza il nuovo metodo del servizio Firebase
    this.firebaseDatabaseService
      .getAllArticles()
      .then((articles) => {
        console.log('Articoli dopo il caricamento:', articles);

        // Assegna gli articoli alla proprietà articles
        this.articles = articles;
      })
      .catch((error) => {
        console.error('Errore durante il recupero degli articoli:', error);
      });
  }

  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }
}
