export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  company: string;
  photo: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  body: string;
}
