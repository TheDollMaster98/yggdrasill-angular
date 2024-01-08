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
        // const displayName = 'Loris TEST'; // Sostituisci con la tua logica
        // console.log('psw => ' + params.password);
        // Aggiorna il nome utente
        // user?.updateProfile({ displayName: displayName });
        // console.log('userCredential => ');
        // console.log(userCredential);
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

  // TODO: controllare QUI!
  // Ottiene il ruolo dell'utente basato sulla sua presenza nelle collezioni admin o users.
  // Restituisce un Observable contenente il ruolo ('admin', 'user' o 'unknown').
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

  // prende la mail corrente
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

  // Metodo per ottenere l'ID dell'utente corrente
  getCurrentUserId(): Observable<string | null> {
    return this.auth.authState.pipe(map((user) => (user ? user.uid : null)));
  }

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
