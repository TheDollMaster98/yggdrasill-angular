import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggingIn: boolean = false;
  isRecoveringPassword: boolean = false;

  constructor(private auth: AngularFireAuth) {}

  // Effettua il login con l'email e la password fornite.
  // Restituisce un'Observable contenente il risultato del login.
  signIn(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Esegue il logout dell'utente attualmente autenticato.
  // Restituisce un'Observable vuota.
  signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Invia un'email per reimpostare la password dell'utente con l'email fornita.
  // Restituisce un'Observable vuota.
  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Restituisce un'Observable booleano che indica se l'utente è attualmente loggato o meno.
  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((user) => !!user));
  }

  // Imposta il tipo di persistenza dell'autenticazione.
  // Restituisce un'Observable vuota.
  setAuthPersistence(persistence: string): Observable<void> {
    return from(this.auth.setPersistence(persistence)).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  // Metodo privato per tradurre i messaggi di errore di Firebase.
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

type SignIn = {
  email: string;
  password: string;
};

type FirebaseError = {
  code: string;
  message: string;
};
