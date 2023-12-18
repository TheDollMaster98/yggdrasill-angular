import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {
  images = [700, 533, 807, 124].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );

  constructor(config: NgbCarouselConfig) {
    // Personalizza le impostazioni predefinite del carosello
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = false;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
