import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostWithUserDetails extends Post {
    author: User;
  }
  
  export interface CreatePostPayload {
    title: string;
    body: string;
    userId: number;
  }
  