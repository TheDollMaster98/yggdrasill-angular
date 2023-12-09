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
  @Input() articlePageStyle: string = '';
  // @Input() color: string = '';
  @Input() articleContent: string = '';
  readingTime: number = 0;
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

      // Calcola il tempo di lettura quando il contenuto cambia
      this.calculateReadingTime(this.articleContent);
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

      // Calcola il tempo di lettura quando i dati temporanei cambiano
      this.calculateReadingTime(temporaryArticle.articleContent ?? '');
      // Altri dati dell'articolo...
    }
  }

  calculateReadingTime(content: string): number {
    // assumiamo che 1 persona legga 200 parole/min:
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    //calcolo:
    this.readingTime = Math.ceil(words / wordsPerMinute);
    return this.readingTime;
  }
}
