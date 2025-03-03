import apiClient from '../config';
import { ENDPOINTS } from '../endpoints';
import { Post, Comment } from '../types';

class PostsService {
  async getAllPosts() {
    return apiClient.get<Post[]>(ENDPOINTS.POSTS);
  }

  async getPostById(id: number) {
    return apiClient.get<Post>(ENDPOINTS.getPostById(id));
  }

  async getPostComments(id: number) {
    return apiClient.get<Comment[]>(ENDPOINTS.getPostComments(id));
  }

  async createPost(data: Omit<Post, 'id'>) {
    return apiClient.post<Post>(ENDPOINTS.POSTS, data);
  }

  async updatePost(id: number, data: Partial<Post>) {
    return apiClient.put<Post>(ENDPOINTS.getPostById(id), data);
  }

  async deletePost(id: number) {
    return apiClient.delete(ENDPOINTS.getPostById(id));
  }
}

export default new PostsService();
