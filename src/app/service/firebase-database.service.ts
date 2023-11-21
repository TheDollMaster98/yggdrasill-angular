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

  create(data: Article): Promise<any> {
    return this.articleCollection
      .add({ ...data })
      .then((docRef) => {
        console.log('Document written with ID:', docRef.id);
        return docRef; // Restituisci il riferimento al documento creato
      })
      .catch((error) => {
        console.error('Error adding document:', error);
        throw error; // Rilancia l'errore per gestirlo nel chiamante, se necessario
      });
  }

  update(id: string, data: any): Promise<void> {
    return this.articleCollection.doc(id).update(data);
  }

  delete(key: string): Promise<void> {
    return this.articleCollection.doc(key).delete();
  }
}
