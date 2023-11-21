// firebase-database.service.ts
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDatabaseService {
  private articlePath = '/articles';
  private articleCollection: AngularFirestoreCollection<Article>;

  constructor(private db: AngularFirestore) {
    this.articleCollection = db.collection(this.articlePath);
    console.log(this.articleCollection);

    // Configurazione dell'emulatore Firebase:
    // this.db.firestore.settings({ host: 'localhost:8080', ssl: false });
  }

  getAll(): AngularFirestoreCollection<Article> {
    return this.articleCollection;
  }

  async create(data: Article): Promise<any> {
    // Verifica dei dati
    if (!data) {
      throw new Error('Data is required');
    }

    try {
      const docRef = await this.articleCollection.add({ ...data });
      console.log('Document written with ID:', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error; // Rilancia l'errore per gestirlo nel chiamante, se necessario
    }
  }

  update(id: string, data: any): Promise<void> {
    // Verifica dei dati
    if (!id || !data) {
      throw new Error('ID and data are required');
    }

    return this.articleCollection.doc(id).update(data);
  }

  delete(key: string): Promise<void> {
    // Verifica dei dati
    if (!key) {
      throw new Error('Key is required');
    }

    return this.articleCollection.doc(key).delete();
  }
}
