import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Action,
  DocumentChange,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreAPIService<T> {
  private collectionName: string = '';

  constructor(private afs: AngularFirestore) {}

  // Funzione per collegarsi all'emulatore Firestore
  connectToFirestoreEmulator(): void {
    if (location.hostname === 'localhost') {
      // Imposta il collegamento all'emulatore solo se l'app è in esecuzione localmente
      this.afs.firestore.useEmulator('localhost', 8888);
    }
  }

  // Imposta il nome della collezione
  setCollection(collectionName: string): void {
    if (collectionName) {
      this.collectionName = collectionName;
    } else {
      // Gestisci il caso in cui il percorso sia vuoto
      console.error(
        'Errore: Il percorso della collezione non può essere vuoto.'
      );
    }
  }

  // TODO: controllare QUI!
  // Verifica se un documento esiste in una collezione specifica.
  // Restituisce un Observable booleano.
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
        map((doc: any) => {
          return doc.exists;
        }),
        // Gestisce eventuali errori restituendo false.
        catchError(() => of(false))
      );
  }

  // Restituisce un riferimento alla collezione specificata
  private get collection(): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(this.collectionName);
  }

  // Restituisce un Observable che emette un array di tutti gli elementi nella collezione
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }
  // Restituisce un Observable che emette un array di tutti gli elementi nella collezione
  // getAll(): Observable<T[]> {
  //   return this.collection.snapshotChanges().pipe(
  //     map((actions: DocumentChange<T>[]) => {
  //       return actions.map((a: DocumentChange<T>) => {
  //         const data = a.payload.doc.data() as T;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   );
  // }

  // Restituisce un Observable che emette l'elemento con l'ID specificato
  getById(id: string): Observable<T | undefined> {
    console.log('Inizio getById con ID:', id);

    if (!id) {
      console.error("Errore: L'ID del documento non può essere vuoto.");
      return of(undefined);
    }

    // Aggiunta verifica per il percorso
    const path = `${this.collectionName}/${id}`;

    if (!path) {
      console.error(
        'Errore: Il percorso della collezione non può essere vuoto.'
      );
      return of(undefined);
    }

    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data() as Record<string, unknown>; // Forza il casting come oggetto generico
          const docId = action.payload.id;
          return { id: docId, ...(data as T) }; // Forza il casting come T
        })
      );
  }

  getByIdCollection(id: string, collection: string): Observable<T | undefined> {
    console.log('Inizio getById con ID:', id);

    if (!id) {
      console.error("Errore: L'ID del documento non può essere vuoto.");
      return of(undefined);
    }

    // Aggiunta verifica per il percorso
    const path = `${this.collection}/${id}`;

    if (!path) {
      console.error(
        'Errore: Il percorso della collezione non può essere vuoto.'
      );
      return of(undefined);
    }

    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data() as Record<string, unknown>; // Forza il casting come oggetto generico
          const docId = action.payload.id;
          return { id: docId, ...(data as T) }; // Forza il casting come T
        })
      );
  }

  getByField(
    collection: string,
    fieldName: string,
    value: any
  ): Observable<T | undefined> {
    console.log(`Inizio getByField con campo ${fieldName} e valore ${value}`);

    return this.afs
      .collection(collection, (ref) => ref.where(fieldName, '==', value))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const data = actions[0]?.payload.doc.data() as Record<
            string,
            unknown
          >;
          const docId = actions[0]?.payload.doc.id;
          return { id: docId, ...(data as T) };
        })
      );
  }
  // funziona:
  getValueInDocument(
    collection: string,
    documentId: string,
    field: string
  ): Observable<any> {
    console.log(
      `Inizio getValueInDocument con collezione ${collection}, ID ${documentId} e campo ${field}`
    );

    const path = `${collection}/${documentId}`;

    if (!path) {
      console.error('Errore: Il percorso del documento non può essere vuoto.');
      return of(undefined);
    }

    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data() as Record<string, unknown>;
          return data ? data[field] : undefined;
        })
      );
  }

  // Aggiunge un nuovo elemento alla collezione e restituisce una Promise
  async add(item: T, customId?: string): Promise<void> {
    if (!customId) {
      // Genera un ID di default se non è fornito uno personalizzato
      await this.collection.add(item);
    }
    await this.collection.doc(customId).set(item);
  }

  // Aggiorna l'elemento con l'ID specificato con i nuovi dati
  update(id: string, data: Partial<T>): Promise<void> {
    return this.collection.doc<T>(id).update(data);
  }

  // Elimina l'elemento con l'ID specificato
  delete(id: string): Promise<void> {
    return this.collection.doc<T>(id).delete();
  }
}

/**
 
 per emulare:
 firebase emulators:start --only firestore

 es:
 interface BlogPost {
  title: string;
  content: string;
  author: string;
  timestamp: any; // Puoi usare un tipo più specifico per le date
}



const blogService = new FirestoreService<BlogPost>();
blogService.setCollection('blogPosts');

// Ora puoi usare il blogService per interagire con la collezione 'blogPosts'
blogService.getAll().subscribe(posts => console.log(posts));

 */
