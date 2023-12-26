import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // The user is logged in, allow access to the route
    } else {
      // The user is not logged in, redirect to the login page
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is logged in before activating the child route
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // The user is not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
