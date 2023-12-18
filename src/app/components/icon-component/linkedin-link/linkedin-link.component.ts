import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkedin-link',
  templateUrl: './linkedin-link.component.html',
  styleUrls: ['./linkedin-link.component.scss'],
})
export class LinkedinLinkComponent implements OnInit {
  @Input() size: number = 3.125; //50px

  constructor() {}

  ngOnInit(): void {}
  // Converti la stringa in numero
  ngOnChanges() {
    this.size = +this.size;
  }
  onLinkedInClick() {
    window.open('https://www.linkedin.com/company/yggdrasillproject');
  }
}
