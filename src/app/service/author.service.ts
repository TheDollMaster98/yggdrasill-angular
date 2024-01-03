import { Injectable } from '@angular/core';
import { getDatabase, ref, set, update, get, remove } from 'firebase/database';
import { Observable, from, map } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  // Metodo per ottenere tutti gli autori
  getAuthors(): Observable<Author[]> {
    const database = getDatabase();
    const authorsRef = ref(database, 'authors');
    return from(get(authorsRef)).pipe(map((snapshot) => snapshot.val() || {}));
  }

  // Metodo per ottenere un autore specifico in base all'email
  getAuthorByEmail(email: string): Observable<Author | null> {
    const database = getDatabase();
    const authorsRef = ref(database, 'authors');
    return from(get(authorsRef)).pipe(
      map((snapshot) => {
        const authors = snapshot.val();
        if (authors) {
          // Trova l'autore in base all'email
          const authorId = Object.keys(authors).find(
            (id) => authors[id]?.email === email
          );
          return authorId ? authors[authorId] : null;
        } else {
          return null;
        }
      })
    );
  }

  // Aggiungi questo metodo nel servizio AuthorService
  getAuthorDisplayNameByEmail(email: string): Observable<string | null> {
    return this.getAuthors().pipe(
      map((authors) => {
        const author = authors.find((a) => a.email === email);
        return author ? author.displayName : null;
      })
    );
  }

  // Metodo per aggiungere un nuovo autore
  addAuthor(authorId: string, authorData: Author): Observable<void> {
    const database = getDatabase();
    const authorRef = ref(database, `authors/${authorId}`);
    return from(set(authorRef, authorData));
  }

  // Metodo per aggiornare i dati di un autore
  updateAuthor(
    authorId: string,
    authorData: Partial<Author>
  ): Observable<void> {
    const database = getDatabase();
    const authorRef = ref(database, `authors/${authorId}`);
    return from(update(authorRef, authorData));
  }

  // Metodo per rimuovere un autore
  removeAuthor(authorId: string): Observable<void> {
    const database = getDatabase();
    const authorRef = ref(database, `authors/${authorId}`);
    return from(remove(authorRef));
  }

  // Altri metodi utili potrebbero essere aggiunti a seconda delle necessità
}
