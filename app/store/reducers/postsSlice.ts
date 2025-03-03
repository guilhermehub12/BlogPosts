import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, CreatePostPayload } from "../../types/post";
import { postService } from "../../services/api/posts";

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await postService.getAllPosts();
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    return await postService.getPostById(id);
  }
);

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (userId: number) => {
    return await postService.getPostsByUser(userId);
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: CreatePostPayload) => {
    return await postService.createPost(post);
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (query: string) => {
    return await postService.searchPosts(query);
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // mostra todos os posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })

      // pesquisa post por id
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post";
      })

      // Pesquisa post por usuario
      .addCase(fetchPostsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user posts";
      })

      // Criar
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create post";
      })

      // Pesquisar
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search posts";
      });
  },
});

export const { clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
