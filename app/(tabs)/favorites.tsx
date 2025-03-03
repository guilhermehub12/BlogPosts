import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { PostList } from '../components/post/PostList';
import { SearchBar } from '../components/ui/SearchBar';
import { FloatingButton } from '../components/ui/FloatingButton';
import { favoritesStorage } from '../utils/storage';
import { setFavorites } from '../store/reducers/favoritesSlice';
import { Post } from '../types/post';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  background-color: #F9FAFB;
`;

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { favoritePosts } = useAppSelector(state => state.favorites);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(favoritePosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(favoritePosts);
        } else {
            filterPosts();
        }
    }, [favoritePosts, searchQuery]);

    const loadFavorites = async () => {
        setLoading(true);
        try {
            const storedFavorites = await favoritesStorage.getFavorites();
            dispatch(setFavorites(storedFavorites));
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
        setLoading(false);
    };

    const filterPosts = () => {
        const query = searchQuery.toLowerCase();
        const filtered = favoritePosts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.body.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
    };

    const handleSearch = () => {
        filterPosts();
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredPosts(favoritePosts);
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
                placeholder="Pesquisar nos favoritos..."
            />

            <PostList
                posts={filteredPosts}
                loading={loading}
                onRefresh={loadFavorites}
                onPostPress={handlePostPress}
                onAuthorPress={handleAuthorPress}
                emptyMessage={
                    searchQuery
                        ? "Nenhum favorito encontrado para sua pesquisa"
                        : "Você ainda não tem posts favoritos"
                }
            />

            <FloatingButton onPress={handleCreatePost} />
        </Container>
    );
};

export default FavoritesScreen;