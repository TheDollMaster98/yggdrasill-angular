// blog.page.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-blog.page',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  articles: any[] = []; // Lista degli articoli

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Carica gli articoli dal servizio quando la pagina si inizializza
    this.loadArticles();
  }

  loadArticles() {
    // Chiama il metodo del servizio per ottenere gli articoli
    this.articleService.updateArticlesAsync().then(() => {
      // Aggiorna la lista degli articoli nella pagina
      this.articles = this.articleService.getPublishedArticles();
    });
  }
}
