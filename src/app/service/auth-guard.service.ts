import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// guardiano di rotte (CanActivate) che controlla se un utente può accedere o meno a una determinata rotta
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: any) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/dashboard']); // Se non si è loggati, reindirizza a /dashboard
          return false;
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate();
  }
}
