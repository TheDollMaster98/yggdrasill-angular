import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-blog-wordpress',
  templateUrl: './blog-wordpress.component.html',
  styleUrls: ['./blog-wordpress.component.scss'],
})
export class DashboardWordpressComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Nascondi il banner di WordPress Free durante l'inizializzazione del componente
    const marketingBar =
      this.elementRef.nativeElement.querySelector('#marketingbar');
    if (marketingBar) {
      this.renderer.setStyle(marketingBar, 'display', 'none');
    }
  }
}
