import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirestoreAPIService } from './firestore-api.service';
import { UserDetails } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
//TODO: fare i test qui per dividre auth dalla gestione permessi
export class PermissionService {
  private adminCollection: string = 'admin';
  private authorCollection: string = 'authors';
  private usersCollection: string = 'users';

  constructor(private firestoreAPIService: FirestoreAPIService<UserDetails>) {}

  getUserRole(email: string): Observable<string> {
    let adminCheck$ = this.firestoreAPIService.checkCollection(
      `${this.adminCollection}/${email}`
    );
    let userCheck$ = this.firestoreAPIService.checkCollection(
      `${this.usersCollection}/${email}`
    );
    let authorCheck$ = this.firestoreAPIService.checkCollection(
      `${this.authorCollection}/${email}`
    );

    return forkJoin([adminCheck$, userCheck$, authorCheck$]).pipe(
      map(([isAdmin, isUser, isAuthor]) => {
        if (isAdmin) {
          return 'admin';
        } else if (isAuthor) {
          return 'author';
        } else if (isUser) {
          return 'user';
        } else {
          return 'unknown';
        }
      }),
      catchError(() => of('unknown'))
    );
  }

  getUserNameByRole(email: string, role: string): Observable<string | null> {
    const path = `${role}/${email}`;
    return this.firestoreAPIService.getById(email, path).pipe(
      map((userData: any) => {
        if (userData && 'name' in userData) {
          return userData.name;
        } else {
          console.error(
            `Errore: Nome utente non trovato nella collezione ${role}.`
          );
          return null;
        }
      })
    );
  }

  // Altre funzionalità di gestione dei permessi...
}
