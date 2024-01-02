// author.model.ts
export interface Author {
  displayName: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
  };
  articles: { [articleId: string]: boolean };
}

export class authorData {
  displayName?: string;
  email?: string;
  profile?: {
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
  };
  articles?: { [articleId: string]: boolean };
}

export interface AuthorList {
  articols: Record<string, Author>;
}
