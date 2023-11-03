import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkedin-link',
  templateUrl: './linkedin-link.component.html',
  styleUrls: ['./linkedin-link.component.scss'],
})
export class LinkedinLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onLinkedInClick() {
    window.open('https://www.linkedin.com/company/yggdrasillproject');
  }
}
