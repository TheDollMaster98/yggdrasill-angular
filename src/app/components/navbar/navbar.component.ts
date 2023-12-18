import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isClockOff = true;
  currentTime = '';
  isMenuOpen: boolean = false;

  constructor() {
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
}
