import api from "./index";
import { Post, CreatePostPayload } from "../../types/post";

export const postService = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get("/posts");
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  getPostsByUser: async (userId: number): Promise<Post[]> => {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  },

  createPost: async (post: CreatePostPayload): Promise<Post> => {
    const response = await api.post("/posts", post);
    return response.data;
  },

  updatePost: async (
    id: number,
    post: Partial<CreatePostPayload>
  ): Promise<Post> => {
    const response = await api.patch(`/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  searchPosts: async (query: string): Promise<Post[]> => {
    // JSONPlaceholder não tem endpoint de busca, então eu busco todos os posts e filtro
    const response = await api.get("/posts");
    const posts = response.data;
    return posts.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    );
  },
};
