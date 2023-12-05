import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  currentArticle?: Article;
  currentIndex = -1;

  constructor(private articleService: ArticleService) {}

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
    this.articleService.getArticles().subscribe({
      next: (data) => {
        console.log('Dati ricevuti:', data);

        // Assegna direttamente l'array ricevuto
        this.articles = Object.values(data);
        console.log('Articoli dopo il caricamento:', this.articles);
      },
      error: (error) => {
        console.error('Errore durante il recupero degli articoli:', error);
      },
    });
  }

  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }
}
