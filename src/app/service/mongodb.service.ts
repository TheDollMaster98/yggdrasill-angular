import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Article, ArticleList } from '../models/article.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MongodbService {
  //TODO: da continuare a spostare il tutto e rendere ordinati i service
  private temporaryArticle: Article | undefined;
  private viewArticle: Article | undefined;

  readingTime: number = 0;
  sanitizedArticleContent: SafeHtml = '';

  // article: Article = new Article();
  submitted: boolean = false;

  private createArticleUrl =
    'https://yggdrasill-server-4c5d50388301.herokuapp.com/api/createArticle';

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  // Metodo per impostare temporaneamente un articolo
  setTemporaryArticle(article: Article) {
    console.log('Temporary article set:', article);
    this.temporaryArticle = article;
  }

  // Metodo per mostrare temporaneamente un articolo
  showTemporaryArticle(): Article | undefined {
    console.log('Showing temporary article:', this.temporaryArticle);
    return this.temporaryArticle;
  }

  // Metodo per creare un nuovo articolo
  newArticle(): void {
    console.log('Creating a new article');
    this.submitted = false;
    // this.article = new Article();
  }

  // Metodo per pulire l'HTML e impostare il contenuto dell'articolo in formato sicuro
  sanitizeAndSetArticleContent(content: string): SafeHtml {
    return (this.sanitizedArticleContent =
      this.sanitizer.bypassSecurityTrustHtml(content));
  }

  // Metodo privato per rimuovere i tag HTML dal contenuto
  private removeHtmlTags(content: string): string {
    return content.replace(/<[^>]*>/g, '');
  }

  // Metodo per calcolare il tempo di lettura
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const cleanContent = this.removeHtmlTags(content);
    const words = cleanContent.split(/\s+/).length;
    this.readingTime = Math.ceil(words / wordsPerMinute);
    return this.readingTime;
  }

  /**----------------------------------------------------------------------- */
  // CRUD Operations:
  // Metodo per ottenere la lista degli articoli
  getArticles(): Observable<ArticleList> {
    console.log('Getting articles');
    return this.api.callGet<ArticleList>(environment.articles).pipe(
      map((response: ArticleList) => {
        console.log('Received articles:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Metodo per ottenere un singolo articolo per ID
  getArticleById(id: string | number): Observable<Article> {
    console.log(`Getting article by ID: ${id}`);
    let url = `${environment.article}/${id}`;

    return this.api.callGet<Article>(url).pipe(
      map((response: Article) => {
        console.log('Received article:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Metodo per creare un nuovo articolo
  createArticle(article: Article): Observable<Article> {
    console.log('Creating article:', article);
    return this.api.callPost<Article>(this.createArticleUrl, article).pipe(
      map((response: Article) => {
        console.log('Article created:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error creating article:', error);
        throw error;
      })
    );
  }

  // Metodo per aggiornare un articolo
  updateArticle(id: string | number, article: Article): Observable<Article> {
    console.log(`Updating article with ID ${id}:`, article);
    let url = `${environment.articles}/${id}`;

    return this.api.callPut<Article>(url, article).pipe(
      switchMap(() => this.getArticleById(id)),
      catchError(this.handleError)
    );
  }

  // Metodo per eliminare un articolo
  deleteArticle(id: string | number): Observable<void> {
    console.log(`Deleting article with ID ${id}`);
    let url = `${environment.articles}/${id}`;

    return this.api.callDelete<void>(url).pipe(catchError(this.handleError));
  }

  // Gestione degli errori generica
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
