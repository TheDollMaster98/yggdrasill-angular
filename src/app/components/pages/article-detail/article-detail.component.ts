// article-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleTitle: string = '';
  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private firestoreService: FirestoreAPIService<Article>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          // Ottieni il titolo dall'URL
          this.articleTitle = params['title'];
          console.log('Article Title:', this.articleTitle);
        }),
        switchMap(() => this.loadArticle())
      )
      .subscribe({
        next: (article) => {
          console.log('Current Article:', article);
          // Fai qualcosa con l'articolo, se necessario
        },
        error: (error) => {
          console.error('Error loading article:', error);
        },
      });
  }
  loadArticle(): Observable<any> {
    // Utilizza il servizio Firestore per ottenere l'articolo dal titolo
    return this.firestoreService.getAll('articles').pipe(
      tap((articles) => {
        console.log('All Articles:', articles);
      }),
      // Trova l'articolo con il titolo corrispondente
      switchMap((articles) =>
        of(
          articles.find(
            (a) =>
              this.formatTitle(a.articleTitle!) ===
              this.formatTitle(this.articleTitle)
          )
        )
      ),
      catchError((error) => {
        console.error('Error loading articles:', error);
        return of(null); // Gestisci l'errore restituendo un observable vuoto o un valore di fallback
      }),
      tap((foundArticle) => {
        // Assegna l'articolo trovato alla variabile article
        this.article = foundArticle ?? undefined;
      })
    );
  }

  // Funzione di utilità per formattare il titolo
  formatTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-');
  }
}
