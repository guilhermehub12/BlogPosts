import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts, searchPosts } from '../store/reducers/postsSlice';
import { PostList } from '../components/post/PostList';
import { SearchBar } from '../components/ui/SearchBar';
import { FloatingButton } from '../components/ui/FloatingButton';
import { useOffline } from '../hooks/useOffline';
import { postsStorage } from '../utils/storage';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  background-color: #F9FAFB;
`;

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector(state => state.posts);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOffline, loadCachedPosts } = useOffline();

  useEffect(() => {
    loadPosts();
  }, [dispatch]);

  const loadPosts = async () => {
    if (isOffline) {
      // Carrega posts do cache se estiver offline
      const cachedPosts = await loadCachedPosts();
      // Aqui poderia atualizar o estado com os posts do cache
    } else {
      // Busca posts do servidor
      dispatch(fetchPosts()).then((action) => {
        if (fetchPosts.fulfilled.match(action)) {
          // Salva os posts no cache para uso offline
          postsStorage.savePosts(action.payload);
        }
      });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchPosts(searchQuery));
    } else {
      dispatch(fetchPosts());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(fetchPosts());
  };

  const handlePostPress = (postId: number) => {
    navigation.navigate('PostDetails' as never, { postId } as never);
  };

  const handleAuthorPress = (userId: number) => {
    navigation.navigate('UserProfile' as never, { userId } as never);
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost' as never);
  };

  return (
    <Container>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        onClear={handleClearSearch}
        placeholder="Pesquisar postagens..."
      />
      
      <PostList
        posts={posts}
        loading={loading}
        onRefresh={loadPosts}
        onPostPress={handlePostPress}
        onAuthorPress={handleAuthorPress}
        emptyMessage={
          searchQuery
            ? "Nenhuma postagem encontrada para sua pesquisa"
            : "Nenhuma postagem disponível"
        }
      />
      
      <FloatingButton onPress={handleCreatePost} />
    </Container>
  );
};

export default HomeScreen;