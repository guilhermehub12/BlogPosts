import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../types/post";
import { UserProfile } from "../types/user";

const STORAGE_KEYS = {
  FAVORITE_POSTS: "@BlogPosts:favorites",
  CACHED_POSTS: "@BlogPosts:posts",
  CURRENT_USER: "@BlogPosts:currentUser",
  OFFLINE_POSTS: "@BlogPosts:offlinePosts",
};

// Utilitários para favoritos
export const favoritesStorage = {
  saveFavorites: async (posts: Post[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(posts);
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_POSTS, jsonValue);
    } catch (error) {
      console.error("Erro ao salvar os favoritos:", error);
    }
  },

  getFavorites: async (): Promise<Post[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_POSTS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Erro ao obter os favoritos:", error);
      return [];
    }
  },

  addFavorite: async (post: Post): Promise<void> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      if (!favorites.some((p) => p.id === post.id)) {
        favorites.push(post);
        await favoritesStorage.saveFavorites(favorites);
      }
    } catch (error) {
      console.error("Erro ao adicionar o favorito:", error);
    }
  },

  removeFavorite: async (postId: number): Promise<void> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      const updatedFavorites = favorites.filter((post) => post.id !== postId);
      await favoritesStorage.saveFavorites(updatedFavorites);
    } catch (error) {
      console.error("Erro ao remover o favorito:", error);
    }
  },

  isFavorite: async (postId: number): Promise<boolean> => {
    try {
      const favorites = await favoritesStorage.getFavorites();
      return favorites.some((post) => post.id === postId);
    } catch (error) {
      console.error("Erro ao verificar o favorito:", error);
      return false;
    }
  },
};

// Utilitários para cache de posts
export const postsStorage = {
  savePosts: async (posts: Post[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(posts);
      await AsyncStorage.setItem(STORAGE_KEYS.CACHED_POSTS, jsonValue);
    } catch (error) {
      console.error("Erro ao salvar postagens em cache:", error);
    }
  },

  getPosts: async (): Promise<Post[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_POSTS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Erro ao receber postagens em cache:", error);
      return [];
    }
  },

  // Para funcionalidade offline-first
  saveOfflinePost: async (post: Post): Promise<void> => {
    try {
      const offlinePosts = await postsStorage.getOfflinePosts();
      offlinePosts.push(post);
      const jsonValue = JSON.stringify(offlinePosts);
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_POSTS, jsonValue);
    } catch (error) {
      console.error("Erro ao salvar postagem offline:", error);
    }
  },

  getOfflinePosts: async (): Promise<Post[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_POSTS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Erro ao receber postagens offline:", error);
      return [];
    }
  },

  clearOfflinePosts: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_POSTS);
    } catch (error) {
      console.error("Erro de limpeza de postagens offline:", error);
    }
  },
};

// Utilitários para usuário atual
export const userStorage = {
  saveCurrentUser: async (user: UserProfile): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, jsonValue);
    } catch (error) {
      console.error("Erro ao salvar o usuário atual:", error);
    }
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Erro ao obter o usuário atual:", error);
      return null;
    }
  },

  clearCurrentUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (error) {
      console.error("Erro de limpeza do usuário atual:", error);
    }
  },
};

// Hook para sincronizar os favoritos com o Redux
export const syncFavoritesWithRedux = async (
  dispatch: any,
  addFavoriteAction: any,
  setFavoritesAction: any
): Promise<void> => {
  try {
    const favorites = await favoritesStorage.getFavorites();
    dispatch(setFavoritesAction(favorites));
  } catch (error) {
    console.error("Erro de sincronia de favoritos com Redux:", error);
  }
};
