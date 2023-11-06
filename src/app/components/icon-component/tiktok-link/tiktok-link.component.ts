import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiktok-link',
  templateUrl: './tiktok-link.component.html',
  styleUrls: ['./tiktok-link.component.scss'],
})
export class TiktokLinkComponent implements OnInit {
  @Input() size: number = 3.125; //50px

  constructor() {}

  ngOnInit(): void {}
  // Converti la stringa in numero
  ngOnChanges() {
    this.size = +this.size;
  }
  onTiktokClick() {
    window.open('https://www.tiktok.com/@yggdrasillproject');
  }
}
