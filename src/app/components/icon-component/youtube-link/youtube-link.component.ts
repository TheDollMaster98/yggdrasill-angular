import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss'],
})
export class YoutubeLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onYoutubeClick() {
    window.open('https://www.toutube.com/');
  }
}
