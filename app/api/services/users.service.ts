import apiClient from '../config';
import { ENDPOINTS } from '../endpoints';
import { User, Post } from '../types';

class UsersService {
  async getUserById(id: number) {
    return apiClient.get<User>(ENDPOINTS.getUserById(id));
  }

  async getUserPosts(id: number) {
    return apiClient.get<Post[]>(ENDPOINTS.getUserPosts(id));
  }
}

export default new UsersService();
