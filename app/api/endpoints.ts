export const ENDPOINTS = {
    POSTS: 'posts',
    POST_BY_ID: (id: number) => `posts/${id}`,
    COMMENTS_BY_POST: (postId: number) => `posts/${postId}/comments`,
    USERS: 'users',
    USER_BY_ID: (id: number) => `users/${id}`,
    POSTS_BY_USER: (userId: number) => `users/${userId}/posts`,
  };