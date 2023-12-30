import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// gestisce le operazioni di autenticazione con Firebase. Ecco una spiegazione delle sue principali funzionalità.s
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signIn(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    ).pipe(
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
