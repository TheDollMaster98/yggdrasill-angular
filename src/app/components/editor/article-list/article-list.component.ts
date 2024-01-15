// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article, ArticleList } from 'src/app/models/article.model';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { Observable } from 'rxjs';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articleList: Article[] = [];
  currentArticle?: Article;
  currentIndex = -1;

  constructor(
    private articleService: ArticleService,
    private firebaseDatabaseService: FirebaseDatabaseService,
    private firestoreAPIService: FirestoreAPIService<Article>
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  refreshList(): void {
    this.currentArticle = undefined;
    this.currentIndex = -1;
    this.loadArticles();
  }

  // metodo realtimedb:
  loadArticles1(): void {
    console.log('Inizio caricamento degli articoli');

    // Utilizza il nuovo metodo del servizio Firebase
    this.firebaseDatabaseService.getAllArticles().subscribe({
      next: (articles) => {
        console.log('Articoli dopo il caricamento:', articles);

        // Assegna gli articoli alla proprietà articles
        this.articleList = articles;
      },
      error: (error) => {
        console.error('Errore durante il recupero degli articoli:', error);
      },
    });
  }

  loadArticles(): void {
    this.firestoreAPIService.getAll('articles').subscribe((article) => {
      console.log('Articoli dopo il caricamento:', article);
      this.articleList = article;
    });
  }

  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }
}
