import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Types, usersService } from "../../api";

interface UsersState {
  currentUser: Types.User | null;
  userPosts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  userPosts: [],
  loading: false,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number) => {
    const response = await usersService.getUserById(id);
    return response.data;
  }
);

export const fetchUserPosts = createAsyncThunk(
  "users/fetchUserPosts",
  async (id: number) => {
    const response = await usersService.getUserPosts(id);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<Types.User>) => {
          state.loading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      });
  },
});

export const { clearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
