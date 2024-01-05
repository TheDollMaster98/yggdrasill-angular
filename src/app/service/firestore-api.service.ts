import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Action,
  DocumentChange,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
    if (!id) {
      console.error("Errore: L'ID del documento non può essere vuoto.");
      return of(undefined);
    }

    return this.collection
      .doc<T>(id)
      .snapshotChanges()
      .pipe(
        map((action: Action<DocumentSnapshot<T>>) => {
          const data = action.payload.data() as T;
          const docId = action.payload.id;
          return { id: docId, ...data };
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
