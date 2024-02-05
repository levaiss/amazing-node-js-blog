export interface IJSONPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IJSONPlaceholderComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IJSONPlaceholderAlbum {
  userId: number;
  id: number;
  title: number;
}
