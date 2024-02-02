// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article, ArticleList } from 'src/app/models/article.model';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { Observable } from 'rxjs';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  private path: string = 'articles-img';
  imageUrl: string | null = null; // Variabile per memorizzare l'URL di download dell'immagine
  articleList: Article[] = [];
  currentArticle?: Article;
  currentIndex = -1;

  constructor(
    private articleService: ArticleService,
    private firebaseDatabaseService: FirebaseDatabaseService,
    private firestoreAPIService: FirestoreAPIService<Article>,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    // this.loadImg();
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
    console.log('Inizio caricamento degli articoli');

    this.firestoreAPIService.getAll('articles').subscribe({
      next: (articles) => {
        console.log('Articoli dopo il caricamento:', articles);

        // Assegna gli articoli alla proprietà articles
        this.articleList = articles;

        // Carica l'URL dell'immagine per ciascun articolo
        this.loadImagesForArticles();
      },
      error: (error) => {
        console.error('Errore durante il recupero degli articoli:', error);
      },
    });
  }

  navigateToArticle(articleTitle: string): void {
    const articleSlug = this.slugify(articleTitle); // Funzione per generare uno slug dal titolo
    this.router.navigate(['/articoli', articleSlug]);
  }

  // Funzione per generare uno slug dal titolo (puoi usarla o implementarne una tua)
  slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
  loadImagesForArticles(): void {
    // TODO: mettere lo spinner
    console.log('Inizio caricamento immagini per gli articoli');

    this.articleList.forEach((article) => {
      this.loadImgForArticle(article);
    });
  }

  loadImgForArticle(article: Article): void {
    if (article.propicUrl) {
      console.log(`Caricamento immagine per l'articolo ${article.id}`);

      this.storageService
        .getFileFromStorage(this.path, article.propicUrl)
        .subscribe({
          next: (url) => {
            console.log(`Immagine caricata per l'articolo ${article.id}:`, url);
            article.propicUrl = url || 'not-found.svg';
          },
          error: (error) => {
            console.error(
              `Errore durante il recupero dell'immagine per l'articolo ${article.id}:`,
              error
            );
            article.propicUrl = 'not-found.svg';
          },
        });
    }
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
    let file = 'propic_author1.jpg';

    // Ottieni l'URL di download dell'immagine e assegnalo alla variabile imageUrl
    this.storageService.getFileFromStorage(this.path, file).subscribe((url) => {
      this.imageUrl = url;
    });
  }
}
