export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentWithUserDetails
  extends Omit<Comment, "name" | "email"> {
  author: {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string;
  };
}

export interface CreateCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}
