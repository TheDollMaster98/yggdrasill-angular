// article-preview.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnChanges {
  @Input() articleTitle: string = '';
  @Input() publishDate: string = '';
  @Input() author: string = '';
  @Input() genre: string = '';
  @Input() color: string = '';
  @Input() articleContent: string = '';
  sanitizedArticleContent: SafeHtml = '';

  article: Article = new Article();

  constructor(
    private sanitizer: DomSanitizer,
    private articleService: ArticleService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleContent']) {
      this.sanitizedArticleContent = this.sanitizer.bypassSecurityTrustHtml(
        this.articleContent
      );
    }
  }

  ngOnInit(): void {
    // Ottieni i dati temporanei dell'articolo dal servizio
    const temporaryArticle = this.articleService.showTemporaryArticle();
    console.log('Temporary Article:', temporaryArticle);

    // Imposta i dati temporanei nell'anteprima
    if (temporaryArticle) {
      this.sanitizedArticleContent = this.sanitizer.bypassSecurityTrustHtml(
        temporaryArticle.articleContent ?? ''
      );
      // Altri dati dell'articolo...
    }
  }
}
