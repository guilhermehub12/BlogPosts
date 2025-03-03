import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useAppDispatch } from "../store/hooks";
import { postsStorage } from "../utils/storage";
import { fetchPosts } from "../store/reducers/postsSlice";
import { Post, CreatePostPayload } from "../types/post";
import { postService } from "../services/api/posts";

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verifica o estado inicial da conexão
    NetInfo.fetch().then((state) => {
      setIsOffline(!state.isConnected);
    });

    // Configura um listener para mudanças no estado da conexão
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected;
      setIsOffline(offline);

      // Se voltar a ficar online, sincroniza os posts offline
      if (!offline) {
        syncOfflinePosts();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Função para criar um post offline
  const createPostOffline = async (post: CreatePostPayload): Promise<Post> => {
    // Gera um ID negativo temporário para o post (para evitar conflitos com IDs do servidor)
    const tempId = -Math.floor(Math.random() * 1000000);
    const offlinePost: Post = {
      ...post,
      id: tempId,
    };

    // Salva o post offline
    await postsStorage.saveOfflinePost(offlinePost);

    return offlinePost;
  };

  // Função para sincronizar posts offline quando voltar a ter conexão
  const syncOfflinePosts = async (): Promise<void> => {
    try {
      const offlinePosts = await postsStorage.getOfflinePosts();

      if (offlinePosts.length > 0) {
        // Para cada post offline, envia para o servidor
        for (const post of offlinePosts) {
          // Remove o ID temporário para que o servidor gere um novo
          const { id, ...postData } = post;

          // Envia o post para o servidor
          await postService.createPost(postData as CreatePostPayload);
        }

        // Limpa os posts offline após sincronização
        await postsStorage.clearOfflinePosts();

        // Recarrega a lista de posts do servidor
        dispatch(fetchPosts());
      }
    } catch (error) {
      console.error("Erro ao sicronizar postagens offline:", error);
    }
  };

  // Função para carregar os posts do cache caso esteja offline
  const loadCachedPosts = async (): Promise<Post[]> => {
    const cachedPosts = await postsStorage.getPosts();
    return cachedPosts;
  };

  return {
    isOffline,
    createPostOffline,
    syncOfflinePosts,
    loadCachedPosts,
  };
};
