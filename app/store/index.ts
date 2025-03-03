import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postsSlice";
import userReducer from "./reducers/usersSlice";
import favoriteReducer from "./reducers/favoritesSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    favorites: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
