import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent {
  @Input() articleTitle: string = '';
  @Input() publishDate: string = '';
  @Input() author: string = '';
  @Input() genre: string = '';
  @Input() color: string = '';
  @Input() articleContent: string = '';

  sanitizedArticleContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleContent']) {
      this.sanitizedArticleContent = this.sanitizer.bypassSecurityTrustHtml(
        this.articleContent
      );
    }
  }
}
