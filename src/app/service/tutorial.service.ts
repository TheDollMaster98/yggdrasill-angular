import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  // Crea un riferimento al nodo 'articles' nel database
  private articlesRef;

  constructor(private db: AngularFireDatabase) {
    // Ottieni una referenza al nodo 'articles'
    this.articlesRef = db.list('/articles');
  }

  // Metodo per impostare i dati dell'articolo
  setArticleData(articleData: any) {
    this.articlesRef.push(articleData);
  }

  // Metodo per aggiornare i dati dell'articolo
  updateArticleData(key: string, articleData: any) {
    this.articlesRef.update(key, articleData);
  }

  // Metodo per ottenere i dati degli articoli
  getArticlesData() {
    return this.articlesRef.valueChanges();
  }
}
