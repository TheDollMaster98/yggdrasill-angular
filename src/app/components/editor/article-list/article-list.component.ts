// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article, ArticleList } from 'src/app/models/article.model';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { Observable } from 'rxjs';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  imageUrl: string | null = null; // Variabile per memorizzare l'URL di download dell'immagine
  articleList: Article[] = [];
  currentArticle?: Article;
  currentIndex = -1;

  constructor(
    private articleService: ArticleService,
    private firebaseDatabaseService: FirebaseDatabaseService,
    private firestoreAPIService: FirestoreAPIService<Article>,
    private sanitizer: DomSanitizer,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadImg();
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

  sanitizeHtml(html: string | undefined): SafeHtml {
    if (!html) {
      return 'N/A';
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // TODO: gestire errori se manca qualcosa
  truncate(content: string, limit: number): string {
    if (!content) {
      content = content.trim(); // Rimuove gli spazi iniziali e finali
      return content.length > limit
        ? content.substring(0, limit) + '...'
        : content;
    }
    return '';
  }

  //TODO: capire come prendere nome file dall'interfaccia
  loadImg() {
    let path = 'articles-img';
    let file = 'propic_author1.jpg';

    // Ottieni l'URL di download dell'immagine e assegnalo alla variabile imageUrl
    this.storageService.getFileFromStorage(path, file).subscribe((url) => {
      this.imageUrl = url;
    });
  }
}
