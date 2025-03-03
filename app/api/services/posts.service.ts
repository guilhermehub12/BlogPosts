import axios from 'axios';
import { ENDPOINTS } from '../endpoints';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface CreateCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}

const postsService = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get(ENDPOINTS.POSTS);
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get(ENDPOINTS.POST_BY_ID(id));
    return response.data;
  },

  getPostsByUser: async (userId: number): Promise<Post[]> => {
    const response = await api.get(ENDPOINTS.POSTS_BY_USER(userId));
    return response.data;
  },

  createPost: async (post: CreatePostPayload): Promise<Post> => {
    const response = await api.post(ENDPOINTS.POSTS, post);
    return response.data;
  },

  updatePost: async (id: number, post: Partial<CreatePostPayload>): Promise<Post> => {
    const response = await api.patch(ENDPOINTS.POST_BY_ID(id), post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(ENDPOINTS.POST_BY_ID(id));
  },

  getCommentsByPost: async (postId: number): Promise<Comment[]> => {
    const response = await api.get(ENDPOINTS.COMMENTS_BY_POST(postId));
    return response.data;
  },

  createComment: async (comment: CreateCommentPayload): Promise<Comment> => {
    const response = await api.post(ENDPOINTS.COMMENTS_BY_POST(comment.postId), comment);
    return response.data;
  },

  searchPosts: async (query: string): Promise<Post[]> => {
    // JSONPlaceholder não tem endpoint de busca, então temos que buscar todos os posts e filtrar
    const response = await api.get(ENDPOINTS.POSTS);
    const posts = response.data;
    return posts.filter(
      (post: Post) => 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.body.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export default postsService;