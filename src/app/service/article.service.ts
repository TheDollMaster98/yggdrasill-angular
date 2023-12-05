import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article, ArticleList } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private temporaryArticle: Article | undefined;
  article: Article = new Article();
  submitted: boolean = false;

  constructor(private api: ApiService) {}

  setTemporaryArticle(article: Article) {
    console.log('Temporary article set:', article);
    this.temporaryArticle = article;
  }

  showTemporaryArticle(): Article | undefined {
    console.log('Showing temporary article:', this.temporaryArticle);
    return this.temporaryArticle;
  }

  newArticle(): void {
    console.log('Creating a new article');
    this.submitted = false;
    this.article = new Article();
  }

  // CRUD Operations

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

  getArticleById(id: string | number): Observable<Article> {
    console.log(`Getting article by ID: ${id}`);
    return this.api.callGet<Article>(`${environment.articles}/${id}`).pipe(
      map((response: Article) => {
        console.log('Received article:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  createArticle(article: Article): Observable<Article> {
    console.log('Creating article:', article);
    return this.api.callPost<Article>(environment.articles, article).pipe(
      map((response: Article) => {
        console.log('Article created:', response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateArticle(id: string | number, article: Article): Observable<Article> {
    console.log(`Updating article with ID ${id}:`, article);
    return this.api
      .callPut<Article>(`${environment.articles}/${id}`, article)
      .pipe(
        map((response: Article) => {
          console.log('Article updated:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteArticle(id: string | number): Observable<void> {
    console.log(`Deleting article with ID ${id}`);
    return this.api
      .callDelete<void>(`${environment.articles}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
