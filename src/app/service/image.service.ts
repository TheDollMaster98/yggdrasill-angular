import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private images = [
    { src: 'assets/images/yggdrasil-logo.png' },
    { src: 'assets/images/yggdrasil-logo.png' },
    { src: 'assets/images/yggdrasil-logo.png' },
    // Aggiungi qui altre immagini
  ];

  getImages() {
    return this.images;
  }
}
