export const ENDPOINTS = {
    POSTS: '/posts',
    USERS: '/users',
    COMMENTS: '/comments',
    getPostById: (id: number) => `/posts/${id}`,
    getPostComments: (id: number) => `/posts/${id}/comments`,
    getUserById: (id: number) => `/users/${id}`,
    getUserPosts: (id: number) => `/users/${id}/posts`
  };
  