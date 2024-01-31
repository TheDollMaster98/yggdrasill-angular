// admin.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  // Metodo che viene chiamato per determinare se l'utente può attivare una determinata route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      // Passa al risultato della isLoggedIn
      switchMap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          // Se l'utente è loggato, ottieni la sua email corrente
          return this.authService.getCurrentUserEmail().pipe(
            switchMap((userEmail: string | null) => {
              if (userEmail) {
                // Se è possibile ottenere l'email, ottieni il ruolo dell'utente
                return this.authService.getUserRole(userEmail).pipe(
                  // Mappa il ruolo in un booleano che determina l'accesso
                  map((role: string) => {
                    if (role === 'admin') {
                      // Se l'utente è admin, permetti l'accesso
                      this.sessionService.setAuthState(true);
                      return true;
                    } else {
                      // Altrimenti, reindirizza a /dashboard e nega l'accesso
                      this.sessionService.setAuthState(false);
                      this.router.navigate(['/dashboard']);
                      return false;
                    }
                  }),
                  // Gestisce eventuali errori nel recupero del ruolo
                  catchError(() => {
                    // In caso di errore, reindirizza a /dashboard e nega l'accesso
                    this.router.navigate(['/dashboard']);
                    this.sessionService.setAuthState(false);
                    return of(false);
                  })
                );
              } else {
                // Se non è possibile ottenere l'email, logga un messaggio e reindirizza a /dashboard
                console.log("Impossibile ottenere l'email dell'utente.");
                this.router.navigate(['/dashboard']);
                return of(false);
              }
            })
          );
        } else {
          // Se l'utente non è loggato, reindirizza a /dashboard e nega l'accesso
          this.router.navigate(['/dashboard']);
          return of(false);
        }
      })
    );
  }
}
