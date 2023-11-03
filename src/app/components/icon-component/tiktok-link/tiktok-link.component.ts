import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiktok-link',
  templateUrl: './tiktok-link.component.html',
  styleUrls: ['./tiktok-link.component.scss'],
})
export class TiktokLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onTiktokClick() {
    window.open('https://www.tiktok.com/@yggdrasillproject');
  }
}
