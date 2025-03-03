import api from "./index";
import { Comment, CreateCommentPayload } from "../../types/comment";

export const commentService = {
  getCommentsByPost: async (postId: number): Promise<Comment[]> => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  createComment: async (comment: CreateCommentPayload): Promise<Comment> => {
    const response = await api.post(
      `/posts/${comment.postId}/comments`,
      comment
    );
    return response.data;
  },
};
