import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { Post } from '../../types/post';
import { PostCard } from './PostCard';
import { useAppSelector } from '../../store/hooks';
import { favoritesStorage } from '../../utils/storage';

interface PostListProps {
    posts: Post[];
    loading: boolean;
    onRefresh?: () => void;
    onPostPress: (postId: number) => void;
    onAuthorPress: (userId: number) => void;
    emptyMessage?: string;
}

const Container = styled(View)`
  flex: 1;
  background-color: #F9FAFB;
`;

const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const EmptyText = styled(Text)`
  font-size: 16px;
  color: #6B7280;
  text-align: center;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PostList: React.FC<PostListProps> = ({
    posts,
    loading,
    onRefresh,
    onPostPress,
    onAuthorPress,
    emptyMessage = "Nenhuma postagem encontrada",
}) => {
    const favorites = useAppSelector(state => state.favorites.favoritePosts);
    const [refreshing, setRefreshing] = useState(false);
    const [localFavorites, setLocalFavorites] = useState<number[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            setLocalFavorites(favorites.map(post => post.id));
        }
    }, [favorites]);

    const loadFavorites = async () => {
        const storedFavorites = await favoritesStorage.getFavorites();
        setLocalFavorites(storedFavorites.map(post => post.id));
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        if (onRefresh) {
            onRefresh();
        }
        await loadFavorites();
        setRefreshing(false);
    };

    if (loading && posts.length === 0) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color="#4F46E5" />
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PostCard
                        post={item}
                        onPress={() => onPostPress(item.id)}
                        onAuthorPress={onAuthorPress}
                        isFavorite={localFavorites.includes(item.id)}
                    />
                )}
                contentContainerStyle={{ paddingVertical: 8, flexGrow: posts.length === 0 ? 1 : undefined }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#4F46E5']}
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <EmptyContainer>
                            <EmptyText>{emptyMessage}</EmptyText>
                        </EmptyContainer>
                    ) : null
                }
            />
        </Container>
    );
};
