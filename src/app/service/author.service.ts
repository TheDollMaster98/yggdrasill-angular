import { Injectable } from '@angular/core';
import { getDatabase, ref, set, update, get, remove } from 'firebase/database';
import { Observable, from, map } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
// TODO: testare se funziona ee salva gli utenti
export class AuthorService {
  private database = getDatabase();

  // Metodo per ottenere tutti gli autori
  getAuthors(): Observable<Author[]> {
    const authorsRef = ref(this.database, 'authors');
    return from(get(authorsRef)).pipe(map((snapshot) => snapshot.val()));
  }

  // Metodo per ottenere un autore specifico
  getAuthor(authorId: string): Observable<Author | null> {
    const authorRef = ref(this.database, `authors/${authorId}`);
    return from(get(authorRef)).pipe(map((snapshot) => snapshot.val()));
  }

  // Metodo per aggiungere un nuovo autore
  addAuthor(authorId: string, authorData: Author): Observable<void> {
    const authorRef = ref(this.database, `authors/${authorId}`);
    return from(set(authorRef, authorData));
  }

  // Metodo per aggiornare i dati di un autore
  updateAuthor(
    authorId: string,
    authorData: Partial<Author>
  ): Observable<void> {
    const authorRef = ref(this.database, `authors/${authorId}`);
    return from(update(authorRef, authorData));
  }

  // Metodo per rimuovere un autore
  removeAuthor(authorId: string): Observable<void> {
    const authorRef = ref(this.database, `authors/${authorId}`);
    return from(remove(authorRef));
  }

  // Altri metodi utili potrebbero essere aggiunti a seconda delle necessità
}
