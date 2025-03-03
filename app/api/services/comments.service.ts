import axios from 'axios';
import { ENDPOINTS } from '../endpoints';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}

const commentsService = {
  getCommentsByPost: async (postId: number): Promise<Comment[]> => {
    const response = await api.get(ENDPOINTS.COMMENTS_BY_POST(postId));
    return response.data;
  },

  createComment: async (postId: number, data: Omit<Comment, 'id' | 'postId'>): Promise<Comment> => {
    const response = await api.post(ENDPOINTS.COMMENTS_BY_POST(postId), {
      ...data,
      postId
    });
    return response.data;
  },

  // Método adicional para criar comentário usando o formato de payload completo
  addComment: async (comment: CreateCommentPayload): Promise<Comment> => {
    const response = await api.post(ENDPOINTS.COMMENTS_BY_POST(comment.postId), comment);
    return response.data;
  },

  // Método para atualizar um comentário (não é diretamente suportado pelo JSONPlaceholder, mas incluído para completude)
  updateComment: async (commentId: number, data: Partial<Omit<Comment, 'id' | 'postId'>>): Promise<Comment> => {
    // Assumindo que teríamos um endpoint como comments/:id no JSONPlaceholder
    const response = await api.patch(`comments/${commentId}`, data);
    return response.data;
  },
  
  // Método para excluir um comentário
  deleteComment: async (commentId: number): Promise<void> => {
    // Assumindo que teríamos um endpoint como comments/:id no JSONPlaceholder
    await api.delete(`comments/${commentId}`);
  }
};

export default commentsService;