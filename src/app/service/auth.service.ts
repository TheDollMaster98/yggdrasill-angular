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
      ),
      map((userCredential) => {
        // Ottieni l'utente corrente
        const user = userCredential.user;

        // Imposta il displayName con il nome utente
        // Puoi aggiungere logicamente la tua logica per ottenere il nome utente
        // TODO: cambiare questa parte, devo prendere il nick assocciato alla mail
        const displayName = 'Loris TEST'; // Sostituisci con la tua logica
        console.log('psw' + params.password);
        // Aggiorna il nome utente
        user?.updateProfile({ displayName: displayName });

        return userCredential;
      })
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

  // AuthService
  // getCurrentUserName(): Observable<string | null> {
  //   return this.auth.authState.pipe(
  //     map((user) => {
  //       console.log('Current user:', user);
  //       return user ? user.displayName : null;
  //     })
  //   );
  // }
  getCurrentUserName(): Observable<string | null> {
    return this.auth.authState.pipe(
      map((user) => {
        console.log('Current user:', user);
        return user ? user.displayName : null;
      }),
      catchError(() => {
        // Gestisci eventuali errori durante il recupero dello stato di autenticazione
        return throwError(
          () => new Error('Error retrieving authentication state.')
        );
      })
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
