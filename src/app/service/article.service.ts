// article.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private temporaryArticle: any;
  private publishedArticles: any[] = [];
  // private link: string = 'https://articles-e4twkpykxa-uc.a.run.app';
  private link: string =
    'https://us-central1-yggdrasill-project.cloudfunctions.net/articles';

  constructor(private api: ApiService) {}

  setTemporaryArticle(article: any) {
    this.temporaryArticle = article;
  }

  showTemporaryArticle(): any {
    return this.temporaryArticle;
  }

  clearTemporaryArticle() {
    this.temporaryArticle = null;
  }

  publishArticle(article: any) {
    this.publishedArticles.push(article);
  }

  getPublishedArticles(): any[] {
    return this.publishedArticles || [];
  }

  // Metodo asincrono per l'aggiornamento degli articoli
  async updateArticlesAsync(): Promise<void> {
    try {
      // Chiamata HTTP per ottenere gli articoli dal backend
      const response = await firstValueFrom(this.api.callGet<any[]>(this.link));
      // Aggiorna la lista degli articoli con la risposta ricevuta dal backend
      this.publishedArticles = response || [];
    } catch (error) {
      // Gestisce gli errori durante l'aggiornamento degli articoli
      console.error("Errore durante l'aggiornamento degli articoli:", error);
      throw error;
    }
  }

  // Metodo asincrono per salvare un articolo nel backend
  async storageArticle(article: any): Promise<void> {
    try {
      // Chiamata HTTP per salvare l'articolo nel backend
      await firstValueFrom(this.api.callPost<void>(this.link, article));
    } catch (error) {
      // Gestisce gli errori durante il salvataggio dell'articolo
      console.error("Errore durante il salvataggio dell'articolo:", error);
      throw error;
    }
  }
}

/**
updateArticlesAsync(): void {
    this.api.callGet<any[]>(environment.articles).subscribe({
      next: (response) => {
        this.publishedArticles = response || [];
      },
      error: (error) => {
        console.error("Errore durante l'aggiornamento degli articoli:", error);
        // Puoi gestire l'errore qui o propagarlo ai livelli superiori
      },
    });
  }

  storageArticle(article: any): void {
    this.api.callPost<void>(environment.articles, article).subscribe({
      next: () => {
        // La chiamata è completata con successo
      },
      error: (error) => {
        console.error("Errore durante il salvataggio dell'articolo:", error);
        // Puoi gestire l'errore qui o propagarlo ai livelli superiori
      },
    });
  }
*/
