// article.model.ts
export interface Article {
  id?: string;
  author?: string;
  propicUrl?: string;
  genre?: string;
  articleTitle?: string;
  articleDescription?: string;
  articleContent?: string;
  publishDate?: string;
}

export class articleData {
  id!: string;
  author?: string;
  propicUrl?: string;
  genre?: string;
  articleTitle?: string;
  articleDescription?: string;
  articleContent?: string;
  publishDate?: string;
  url?: string;
  name!: string;
  file: File;
  static propicUrl: any;

  constructor(file: File, article: Article) {
    this.file = file;
    this.author = article.author;
    this.propicUrl = article.propicUrl;
    this.genre = article.genre;
    this.articleTitle = article.articleTitle;
    this.articleDescription = article.articleDescription;
    this.articleContent = article.articleContent;
    this.publishDate = article.publishDate;
  }
}

export interface ArticleList {
  articles: Record<string, Article>;
}
