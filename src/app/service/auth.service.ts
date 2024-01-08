import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  catchError,
  from,
  map,
  Observable,
  throwError,
  switchMap,
  of,
  forkJoin,
  BehaviorSubject,
} from 'rxjs';
import { SignIn, SignUp, FirebaseError } from '../models/auth.model';
import { UserDetails } from '../models/user.model';
import { FirestoreAPIService } from './firestore-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRoleSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('unknown');

  isLoggingIn: boolean = false;
  isRecoveringPassword: boolean = false;

  private adminCollection: string = 'admin';
  private usersCollection: string = 'users';

  constructor(
    private auth: AngularFireAuth,
    private firestoreAPIService: FirestoreAPIService<UserDetails>
  ) {}

  // Effettua l'accesso dell'utente con le credenziali fornite
  signIn(params: SignIn): Observable<any> {
    console.log('Inizio signIn:', params);

    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    ).pipe(
      catchError((error: FirebaseError) => {
        console.error('Errore durante il login:', error);
        // Ritorna un observable di tipo any
        return throwError(
          () => new Error(this.translateFirebaseErrorMessage(error))
        );
      }),
      switchMap((userCredential) => {
        const user = userCredential.user;
        console.log('Utente autenticato:', user);

        // Ottieni i dettagli dell'utente dal database e imposta il nome utente
        return this.getUserDetails(user?.email || '').pipe(
          switchMap((userDetails) => {
            if (userDetails) {
              const displayName = userDetails.name || 'Autore Sconosciuto';
              console.log('Dettagli utente:', userDetails);

              // Aggiorna il nome utente
              return this.setCurrentUserName(displayName).pipe(
                map(() => userCredential)
              );
            } else {
              // Dettagli utente non trovati nel database, effettua il logout e restituisci un errore
              console.error('Dettagli utente non trovati nel database.');
              return this.signOut().pipe(
                switchMap(() =>
                  throwError(
                    () => new Error('Dettagli utente non trovati nel database.')
                  )
                )
              );
            }
          }),
          catchError((err) => {
            console.error(
              "Errore durante l'ottenimento dei dettagli utente:",
              err
            );
            // Ritorna un observable di tipo any
            return of(userCredential);
          })
        );
      }),
      catchError((err) => {
        console.error('Errore generico durante il login:', err);
        // Ritorna un observable di tipo any
        return of(null);
      })
    );
  }

  // Effettua il logout dell'utente attualmente autenticato
  signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Invia un'email per reimpostare la password dell'utente con l'email fornita
  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Ottiene il ruolo dell'utente basato sulla sua presenza nelle collezioni admin o users
  getUserRole(email: string): Observable<string> {
    let adminCheck$ = this.firestoreAPIService.checkCollection(
      `${this.adminCollection}/${email}`
    );
    let userCheck$ = this.firestoreAPIService.checkCollection(
      `${this.usersCollection}/${email}`
    );

    return forkJoin([adminCheck$, userCheck$]).pipe(
      map(([isAdmin, isUser]) => {
        if (isAdmin) {
          this.userRoleSubject.next('admin');
          return 'admin';
        } else if (isUser) {
          this.userRoleSubject.next('user');
          return 'user';
        } else {
          this.userRoleSubject.next('unknown');
          return 'unknown';
        }
      }),
      catchError(() => {
        this.userRoleSubject.next('unknown');
        return of('unknown');
      })
    );
  }

  // Ottiene l'email dell'utente correntemente autenticato
  getCurrentUserEmail(): Observable<string | null> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return of(user.email || null);
        } else {
          return of(null);
        }
      }),
      catchError(() => of(null))
    );
  }

  // Ottiene i dettagli dell'utente dal database
  getUserDetails(email: string): Observable<UserDetails | null> {
    return this.firestoreAPIService
      .getById(email)
      .pipe(map((userDetails) => userDetails || null));
  }

  // Verifica se l'utente è attualmente loggato
  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  // Imposta il tipo di persistenza dell'autenticazione
  setAuthPersistence(persistence: string): Observable<void> {
    return from(this.auth.setPersistence(persistence)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Ottiene l'ID dell'utente correntemente autenticato
  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => (user ? user.uid : null)));
  }

  // Imposta il nome utente dell'utente correntemente autenticato
  setCurrentUserName(displayName: string): Observable<void> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Usa 'from' per convertire la promise in un observable
          return from(
            user.updateProfile({ displayName: displayName }) ||
              Promise.resolve()
          );
        } else {
          return throwError(() => new Error('User not authenticated.'));
        }
      }),
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Ottiene il nome utente dell'utente correntemente autenticato
  getCurrentUserName(): Observable<string | null> {
    return this.auth.authState.pipe(
      map((user) => (user ? user.displayName : 'Autore Sconosciuto')),
      catchError(() =>
        throwError(() => new Error('Error retrieving user name.'))
      )
    );
  }

  // Traduce i messaggi di errore di Firebase
  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === 'auth/user-not-found') {
      return 'User not found.';
    }
    if (code === 'auth/wrong-password') {
      return 'Incorrect password.';
    }
    return message;
  }
}
