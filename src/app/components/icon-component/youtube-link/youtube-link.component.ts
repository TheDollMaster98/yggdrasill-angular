import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss'],
})
export class YoutubeLinkComponent implements OnInit {
  @Input() size: number = 3.125; //50px

  constructor() {}

  ngOnInit(): void {}
  // Converti la stringa in numero
  ngOnChanges() {
    this.size = +this.size;
  }
  onYoutubeClick() {
    window.open('https://www.youtube.com/@Yggdrasillproject');
  }
}
