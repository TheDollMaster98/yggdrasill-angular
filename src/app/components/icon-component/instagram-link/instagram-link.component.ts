import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-instagram-link',
  templateUrl: './instagram-link.component.html',
  styleUrls: ['./instagram-link.component.scss'],
})
export class InstagramLinkComponent implements OnInit {
  @Input() size: number = 3.125; //50px

  constructor() {}

  ngOnInit(): void {}
  // Converti la stringa in numero
  ngOnChanges() {
    this.size = +this.size;
  }
  onInstagramClick() {
    window.open('https://www.instagram.com/yggdrasill.project');
  }
}
