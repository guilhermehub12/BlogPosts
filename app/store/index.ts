import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsSlice";
import usersReducer from "./reducers/usersSlice";
import favoritesReducer from "./reducers/favoritesSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
