import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onTiktokClick() {
    window.open('https://www.tiktok.com/@yggdrasillproject');
  }

  onInstagramClick() {
    window.open('https://www.instagram.com/yggdrasill.project');
  }

  onLinkedInClick() {
    window.open('https://www.linkedin.com/company/yggdrasillproject');
  }
}
