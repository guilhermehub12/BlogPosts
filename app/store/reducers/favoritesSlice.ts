import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favorites: number[];
  loading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
};

export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.favorites.indexOf(postId);

      if (index === -1) {
        state.favorites.push(postId);
      } else {
        state.favorites.splice(index, 1);
      }

      // Persistir no AsyncStorage (BD local)
      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
