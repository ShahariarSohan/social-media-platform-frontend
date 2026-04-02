export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  posts?: Post[];
  comments?: Comment[];
  likes?: Like[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author: User;
  comments: Comment[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
