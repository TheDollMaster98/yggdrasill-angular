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
  @Input() article: Article = new Article();

  readingTime: number = 0;
  sanitizedArticleContent: SafeHtml = '';

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

  //test nuovo articolo:
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['article']) {
  //     const newArticle = changes['article'].currentValue as Article;
  //     this.sanitizeAndSetArticleContent(newArticle.articleContent || 'N/A');
  //     this.calculateReadingTime(newArticle.articleContent || 'N/A');
  //   }
  // }

  ngOnInit(): void {
    const temporaryArticle = this.articleService.showTemporaryArticle();
    const article = this.articleService.getArticles();

    if (temporaryArticle) {
      this.sanitizeAndSetArticleContent(temporaryArticle.articleContent ?? '');
      // Calcola il tempo di lettura quando i dati temporanei cambiano
      this.calculateReadingTime(temporaryArticle.articleContent ?? '');
      // Altri dati dell'articolo...
    }
  }

  private sanitizeAndSetArticleContent(content: string): SafeHtml {
    return (this.sanitizedArticleContent =
      this.sanitizer.bypassSecurityTrustHtml(content));
  }
  private removeHtmlTags(content: string): string {
    // Rimuovi le etichette HTML (non è la soluzione più precisa)
    return content.replace(/<[^>]*>/g, '');
  }

  calculateReadingTime(content: string): number {
    // assumiamo che 1 persona legga 200 parole/min:
    const wordsPerMinute = 200;
    const cleanContent = this.removeHtmlTags(content);
    const words = cleanContent.split(/\s+/).length;
    //calcolo:
    this.readingTime = Math.ceil(words / wordsPerMinute);
    return this.readingTime;
  }
}
