// user.model.ts

export interface UserDetails {
  id: string;
  email: string;
  role: string;
  admin?: boolean;
  authors?: boolean;
  name?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
}

export interface Author {
  displayName: string;
  email: string;
  profile: UserProfile;
  articles: Record<string, boolean>;
}

export interface AuthorList {
  articles: Record<string, Author>;
}

export interface UserRoles {
  admin: boolean;
  authors: boolean;
}

// Intersection type per combinare le proprietà di UserDetails e UserRoles
export type UserData = UserDetails & UserRoles & { profile?: UserProfile };

export class AuthorData implements Author {
  displayName: string = '';
  email: string = '';
  profile: UserProfile = {
    firstName: '',
    lastName: '',
    bio: '',
    avatar: '',
  };
  articles: Record<string, boolean> = {};
}

// Da aggiungere alla classe AuthorData se necessario
export function isAuthorData(obj: any): obj is AuthorData {
  return obj instanceof AuthorData;
}
