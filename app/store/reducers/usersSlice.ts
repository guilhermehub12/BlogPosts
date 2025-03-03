import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "../../types/user";
import { userService } from "../../services/api/users";

interface UserState {
  currentUser: UserProfile | null;
  viewedUser: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  viewedUser: null,
  loading: false,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: number) => {
    const user = await userService.getUserById(userId);
    // Adiciona o avatar ao usuário
    return {
      ...user,
      avatar: userService.generateUserAvatar(user.name),
    };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
    },
    clearViewedUser: (state) => {
      state.viewedUser = null;
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
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.viewedUser = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { setCurrentUser, clearViewedUser } = userSlice.actions;
export default userSlice.reducer;
