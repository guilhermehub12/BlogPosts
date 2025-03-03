import apiClient from '../config';
import { ENDPOINTS } from '../endpoints';
import { Comment } from '../types';

class CommentsService {
  async createComment(postId: number, data: Omit<Comment, 'id' | 'postId'>) {
    return apiClient.post<Comment>(ENDPOINTS.getPostComments(postId), {
      ...data,
      postId
    });
  }
}

export default new CommentsService();