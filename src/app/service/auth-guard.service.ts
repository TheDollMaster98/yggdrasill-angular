import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// guardiano di rotte (CanActivate) che controlla se un utente può accedere o meno a una determinata rotta
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      switchMap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return this.authService.getCurrentUserEmail().pipe(
            switchMap((userEmail: string | null) => {
              if (userEmail) {
                return this.authService.getUserRole(userEmail).pipe(
                  map((role: string) => {
                    if (role === 'admin') {
                      return true;
                    } else {
                      this.router.navigate(['/dashboard']);
                      return false;
                    }
                  }),
                  catchError(() => {
                    this.router.navigate(['/dashboard']);
                    return of(false);
                  })
                );
              } else {
                console.log("Impossibile ottenere l'email dell'utente.");
                // Gestire il caso in cui l'email non può essere recuperata
                this.router.navigate(['/dashboard']);
                return of(false);
              }
            })
          );
        } else {
          this.router.navigate(['/dashboard']);
          return of(false);
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
