import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, throwError, from, of, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { FirebaseError } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})

//TODO: fare i test qui per dividre auth dalla gestione permessi
export class AuthReworkService {
  private currentUser$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  authName: string = '';
  isLoggingIn: boolean = false;
  isRecoveringPassword: boolean = false;

  constructor(private auth: AngularFireAuth) {
    // Imposta la persistenza della sessione
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  getAuthName(): Observable<string | null> {
    return this.currentUser$.asObservable();
  }

  setAuthName(newName: string) {
    this.authName = newName;
    this.currentUser$.next(newName);
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
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
          // Puoi gestire qui eventuali azioni post-autenticazione
        }
        return of(userCredential);
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

  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  // Resto del codice per le funzionalità rimanenti...

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
