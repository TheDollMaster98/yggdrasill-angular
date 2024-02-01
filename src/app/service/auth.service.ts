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
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRoleSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('unknown');
  private currentUser$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  authName: string = '';

  isLoggingIn: boolean = false;
  isRecoveringPassword: boolean = false;

  private adminCollection: string = 'admin';
  private authorCollection: string = 'authors';
  private usersCollection: string = 'users';

  constructor(
    private auth: AngularFireAuth,
    private firestoreAPIService: FirestoreAPIService<UserDetails>
  ) {}

  // setAuthName(newName: string) {
  //   this.authName = newName;
  // }

  // getAuthName() {
  //   return this.authName;
  // }

  getAuthName(): Observable<string | null> {
    return this.currentUser$.asObservable();
  }

  setAuthName(newName: string) {
    this.authName = newName;
    this.currentUser$.next(newName);
  }

  signIn(params: SignIn): Observable<any> {
    console.log('Inizio signIn:', params);

    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    ).pipe(
      catchError((error: FirebaseError) => {
        console.error('Errore durante il login:', error);
        return throwError(
          () => new Error(this.translateFirebaseErrorMessage(error))
        );
      }),
      switchMap((userCredential) => {
        const user = userCredential.user;
        console.log('Utente autenticato:', user);

        const userEmail = user?.email;
        if (userEmail) {
          return this.getUserDetails(userEmail).pipe(
            switchMap((userDetails) => {
              if (userDetails) {
                const displayName = userDetails.name || 'Autore Sconosciuto';
                this.authName = userDetails.name || 'Autore Sconosciuto';
                console.log('Dettagli utente:', userDetails);

                return this.setCurrentUserName(displayName).pipe(
                  map(() => userCredential)
                );
              } else {
                console.error('Dettagli utente non trovati nel database.');
                return this.signOut().pipe(
                  switchMap(() =>
                    throwError(
                      () =>
                        new Error('Dettagli utente non trovati nel database.')
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
              return of(userCredential);
            })
          );
        } else {
          console.error("Errore: Email dell'utente non presente.");
          return of(userCredential);
        }
      }),
      catchError((err) => {
        console.error('Errore generico durante il login:', err);
        return of(null);
      })
    );
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

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
          this.userRoleSubject.next('admin');
          return 'admin';
        } else if (isAuthor) {
          this.userRoleSubject.next('author');
          return 'author';
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

  getUserDetails(email: string): Observable<UserDetails | null> {
    console.log('Inizio getUserDetails con email:', email);

    if (!email) {
      console.error("Errore: Email dell'utente non valida.");
      return of(null);
    }

    return this.firestoreAPIService.getById(email, this.usersCollection).pipe(
      map((userDetails) => {
        console.log('Dettagli utente ottenuti con successo:', userDetails);
        return userDetails || null;
      }),
      catchError((error) => {
        console.error('Errore durante il recupero dei dettagli utente:', error);
        return of(null);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  setAuthPersistence(persistence: string): Observable<void> {
    return from(this.auth.setPersistence(persistence)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => (user ? user.uid : null)));
  }

  setCurrentUserName(displayName: string): Observable<void> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
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

  getCurrentUserName(): Observable<string | null> {
    return this.auth.authState.pipe(
      map((user) => (user ? user.displayName : 'Autore Sconosciuto')),
      catchError(() =>
        throwError(() => new Error('Error retrieving user name.'))
      )
    );
  }

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
