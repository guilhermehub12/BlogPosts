import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/post";

interface FavoriteState {
  favoritePosts: Post[];
}

const initialState: FavoriteState = {
  favoritePosts: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Post>) => {
      if (!state.favoritePosts.some((post) => post.id === action.payload.id)) {
        state.favoritePosts.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoritePosts = state.favoritePosts.filter(
        (post) => post.id !== action.payload
      );
    },
    setFavorites: (state, action: PayloadAction<Post[]>) => {
      state.favoritePosts = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
