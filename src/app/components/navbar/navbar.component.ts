import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isClockOff = true;
  currentTime = '';
  isMenuOpen: boolean = false;

  //login:
  private authSubscription: Subscription;
  isLoggedIn = this.authService.isLoggedIn();

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authSubscription = this.isLoggedIn.subscribe((loggedIn: any) => {
      this.isLoggedIn = loggedIn;
    });
    setTimeout(() => this.secondPassed(), 2000);

    setInterval(() => {
      const now = new Date();
      const hours = this.formatTimeUnit(now.getHours());
      const minutes = this.formatTimeUnit(now.getMinutes());
      const seconds = this.formatTimeUnit(now.getSeconds());
      this.currentTime = `${hours} : ${minutes} : ${seconds}`;
    }, 1000);
  }
  ngOnInit(): void {}

  secondPassed() {
    this.isClockOff = false;
  }

  formatTimeUnit(unit: number) {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnDestroy(): void {
    // Unsubscribe per evitare memory leaks
    this.authSubscription.unsubscribe();
  }
}
