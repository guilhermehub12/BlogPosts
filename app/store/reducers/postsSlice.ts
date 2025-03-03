import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Types, postsService } from "../../api";

interface PostsState {
  posts: Types.Post[];
  currentPost: Types.Post | null;
  comments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postsService.getAllPosts();
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    const response = await postsService.getPostById(id);
    return response.data;
  }
);

export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async (id: number) => {
    const response = await postsService.getPostComments(id);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data: Omit<Types.Post, "id">) => {
    const response = await postsService.createPost(data);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    addPost: (state, action: PayloadAction<Types.Post>) => {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Types.Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Types.Post>) => {
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<Types.Post>) => {
          state.posts.unshift(action.payload);
        }
      );
  },
});

export const { clearCurrentPost, addPost } = postsSlice.actions;
export default postsSlice.reducer;
