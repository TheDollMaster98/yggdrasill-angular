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
  id?: string;
  author?: string;
  propicUrl?: string;
  genre?: string;
  articleTitle?: string;
  articleDescription?: string;
  articleContent?: string;
  publishDate?: string;
}

export interface ArticleList {
  articols: Record<string, Article>;
}
