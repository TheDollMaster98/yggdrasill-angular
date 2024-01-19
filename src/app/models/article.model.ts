// article.model.ts
export interface Article {
  id?: string;
  author?: string;
  propicUrl: string; // Questo dovrebbe contenere solo il nome del file
  imageUrl?: string; // Aggiungi questa proprietà per memorizzare l'URL dell'immagine
  genre?: string;
  articleTitle?: string;
  articleDescription?: string;
  articleContent?: string;
  publishDate?: string;
}

export class articleData {
  id?: string;
  author?: string;
  genre?: string;
  articleTitle?: string;
  articleContent?: string;
  publishDate?: string;
}

export interface ArticleList {
  articols: Record<string, Article>;
}
