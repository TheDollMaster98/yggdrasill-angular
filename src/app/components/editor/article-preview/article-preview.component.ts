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
      this.readingTime = this.articleService.calculateReadingTime(
        this.articleContent
      );
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
      this.articleService.sanitizeAndSetArticleContent(
        temporaryArticle.articleContent ?? ''
      );
      // Calcola il tempo di lettura quando i dati temporanei cambiano
      this.readingTime = this.articleService.calculateReadingTime(
        temporaryArticle.articleContent ?? ''
      );
      // Altri dati dell'articolo...
    }
  }
}
