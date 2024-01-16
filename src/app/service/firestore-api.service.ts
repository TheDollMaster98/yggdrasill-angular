import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreAPIService<T> {
  constructor(private afs: AngularFirestore) {}

  /**
   * Connessione all'emulatore Firestore se l'app è in esecuzione localmente.
   */
  connectToFirestoreEmulator(): void {
    if (location.hostname === 'localhost') {
      // this.afs.firestore.useEmulator('localhost', 8888);
    }
  }

  /**
   * Restituisce una raccolta specificata come AngularFirestoreCollection.
   * @param collectionName Nome della collezione.
   * @returns AngularFirestoreCollection.
   */
  private getCollection(collectionName: string): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(collectionName);
  }

  /**
   * Ottiene tutti gli elementi di una collezione specificata.
   * @param collectionName Nome della collezione.
   * @returns Observable che emette un array di tutti gli elementi nella collezione.
   */
  getAll(collectionName: string): Observable<T[]> {
    return this.getCollection(collectionName)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(
            `Error fetching data from collection ${collectionName}:`,
            error
          );
          return of([]);
        })
      );
  }

  /**
   * Ottiene un elemento specificato dall'ID in una collezione specificata.
   * @param id ID dell'elemento.
   * @param collectionName Nome della collezione.
   * @returns Observable che emette l'elemento con l'ID specificato.
   */
  getById(id: string, collectionName: string): Observable<T | undefined> {
    if (!id) {
      console.error('Error: Document ID cannot be empty.');
      return of(undefined);
    }

    const path = `${collectionName}/${id}`;

    if (!path) {
      console.error('Error: Collection path cannot be empty.');
      return of(undefined);
    }

    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data() as Record<string, unknown>;
          const docId = action.payload.id;
          return { id: docId, ...(data as T) };
        }),
        catchError((error) => {
          console.error('Error fetching document by ID:', error);
          return of(undefined);
        })
      );
  }

  /**
   * Ottiene un campo specificato da un documento in una collezione specificata.
   * @param id ID dell'elemento.
   * @param collectionName Nome della collezione.
   * @param field Nome del campo da ottenere.
   * @returns Observable che emette il valore del campo specificato.
   */
  getFieldById<K extends keyof T>(
    id: string,
    collectionName: string,
    field: K
  ): Observable<T[K] | undefined> {
    return this.getById(id, collectionName).pipe(
      map((document) => (document ? document[field] : undefined))
    );
  }

  /**
   * Ottiene l'intero documento da un ID specificato in una collezione specificata.
   * @param id ID dell'elemento.
   * @param collectionName Nome della collezione.
   * @returns Observable che emette l'intero documento.
   */
  getDocumentById(
    id: string,
    collectionName: string
  ): Observable<T | undefined> {
    return this.getCollection(collectionName)
      .doc<T>(id)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error('Error fetching document by ID:', error);
          return of(undefined);
        })
      );
  }

  // Verifica se un documento esiste in una collezione specifica.
  // Restituisce un Observable booleano.
  /**
   * Verifica se un documento esiste in una collezione specifica.
   * @param path Percorso del documento nella collezione.
   * @returns Observable che emette un booleano indicando se il documento esiste.
   */
  checkCollection(path: string): Observable<boolean> {
    // Verifica se il percorso è vuoto
    if (!path) {
      console.error(
        'Errore: Il percorso della collezione non può essere vuoto.'
      );
      return of(false);
    }

    // Ottiene il documento dalla collezione specificata usando il percorso.
    return this.afs
      .doc(path)
      .get()
      .pipe(
        // Trasforma il risultato in un booleano, indicando se il documento esiste o meno.
        map((doc) => {
          return doc.exists;
        }),
        // Gestisce eventuali errori restituendo false.
        catchError(() => of(false))
      );
  }

  //

  /**
   * Aggiunge un nuovo elemento alla collezione specificata.
   * @param item Elemento da aggiungere.
   * @param collectionName Nome della collezione.
   * @param customId ID personalizzato, se specificato.
   * @returns Promise<void>.
   */
  async add(item: T, collectionName: string, customId?: string): Promise<void> {
    const collection = this.getCollection(collectionName);

    try {
      if (!customId) {
        await collection.add(item);
      } else {
        await collection.doc(customId).set(item);
      }
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  /**
   * Aggiorna l'elemento con l'ID specificato con i nuovi dati.
   * @param id ID dell'elemento da aggiornare.
   * @param collectionName Nome della collezione.
   * @param data Nuovi dati da aggiornare.
   * @returns Promise<void>.
   */
  async update(
    id: string,
    collectionName: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      return await this.getCollection(collectionName).doc<T>(id).update(data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  /**
   * Elimina l'elemento con l'ID specificato da una collezione specificata.
   * @param id ID dell'elemento da eliminare.
   * @param collectionName Nome della collezione.
   * @returns Promise<void>.
   */
  async delete(id: string, collectionName: string): Promise<void> {
    try {
      return await this.getCollection(collectionName).doc<T>(id).delete();
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}
