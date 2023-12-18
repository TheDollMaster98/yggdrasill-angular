import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ham-button',
  templateUrl: './ham-button.component.html',
  styleUrls: ['./ham-button.component.scss'],
})
export class HamButtonComponent implements OnInit {
  isMenuOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
