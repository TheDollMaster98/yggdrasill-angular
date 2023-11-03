import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instagram-link',
  templateUrl: './instagram-link.component.html',
  styleUrls: ['./instagram-link.component.scss'],
})
export class InstagramLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onInstagramClick() {
    window.open('https://www.instagram.com/yggdrasill.project');
  }
}
