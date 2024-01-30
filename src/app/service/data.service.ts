import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { FirestoreAPIService } from './firestore-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private firestoreService: FirestoreAPIService<Article>,
    private storageService: StorageService
  ) {}

  addArticleWithFile(
    file: File,
    article: Article,
    storagePath: string,
    firestoreCollection: string
  ): Observable<void> {
    // 1. Carica il file nello storage e ottieni l'URL di download del file appena caricato
    return this.storageService.pushFileToStorage(file, storagePath).pipe(
      switchMap((uploadProgress) =>
        this.storageService.getDownloadURL(`${storagePath}/${file.name}`).pipe(
          // Utilizza switchMap per combinare il valore di uploadProgress con l'URL di download
          switchMap((downloadURL) => {
            console.log(`Upload progress: ${uploadProgress}%`);
            article.propicUrl = downloadURL.url;
            // Aggiungi l'articolo alla collezione del Firestore
            return this.firestoreService.add(article, firestoreCollection);
          })
        )
      ),
      // Opzionalmente, puoi eseguire altre operazioni dopo l'aggiunta del documento al Firestore
      finalize(() =>
        console.log(
          "Operazioni aggiuntive dopo l'aggiunta del documento al Firestore"
        )
      )
    );
  }
}
