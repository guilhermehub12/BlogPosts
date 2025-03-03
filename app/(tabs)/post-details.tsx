import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPostById } from '../store/reducers/postsSlice';
import { fetchUserById } from '../store/reducers/usersSlice';
import { commentService } from '../services/api/comments';
import { CommentList } from '../components/comment/CommentList';
import { CommentForm } from '../components/comment/CommentForm';
import { Comment, CreateCommentPayload } from '../types/comment';
import { UserAvatar } from '../components/user/UserAvatar';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { addFavorite, removeFavorite } from '../store/reducers/favoritesSlice';
import { favoritesStorage } from '../utils/storage';
import { User } from '../types/user';

type PostDetailsRouteProp = RouteProp<{ PostDetails: { postId: number } }, 'PostDetails'>;

const Container = styled(View)`
  flex: 1;
  background-color: #FFFFFF;
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

const PostContainer = styled(View)`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #E5E7EB;
`;

const PostHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TitleContainer = styled(View)`
  flex: 1;
  margin-right: 16px;
`;

const Title = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
`;

const Body = styled(Text)`
  font-size: 16px;
  color: #4B5563;
  line-height: 24px;
`;

const AuthorContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const AuthorInfo = styled(View)`
  margin-left: 12px;
`;

const AuthorName = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #4B5563;
`;

const AuthorUsername = styled(Text)`
  font-size: 14px;
  color: #6B7280;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const FavoriteButton = styled(TouchableOpacity)`
  padding: 8px;
`;

const PostDetailsScreen = () => {
    const route = useRoute<PostDetailsRouteProp>();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const { postId } = route.params;
    const { currentPost, loading: postLoading } = useAppSelector(state => state.posts);
    const { viewedUser, loading: userLoading } = useAppSelector(state => state.users);
    const { favoritePosts } = useAppSelector(state => state.favorites);

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [createCommentLoading, setCreateCommentLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        loadPost();
        loadComments();
        checkIfFavorite();
    }, [postId]);

    useEffect(() => {
        if (currentPost) {
            loadAuthor();
        }
    }, [currentPost]);

    useEffect(() => {
        // Verifica se o post atual está nos favoritos
        if (currentPost) {
            const isCurrentPostFavorite = favoritePosts.some(
                post => post.id === currentPost.id
            );
            setIsFavorite(isCurrentPostFavorite);
        }
    }, [currentPost, favoritePosts]);

    const loadPost = () => {
        dispatch(fetchPostById(postId));
    };

    const loadAuthor = () => {
        if (currentPost) {
            dispatch(fetchUserById(currentPost.userId));
        }
    };

    const loadComments = async () => {
        setCommentsLoading(true);
        try {
            const fetchedComments = await commentService.getCommentsByPost(postId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
            Alert.alert('Erro', 'Não foi possível carregar os comentários.');
        }
        setCommentsLoading(false);
    };

    const handleCreateComment = async (comment: CreateCommentPayload) => {
        setCreateCommentLoading(true);
        try {
            const newComment = await commentService.createComment(comment);
            setComments(prevComments => [newComment, ...prevComments]);
            Alert.alert('Sucesso', 'Comentário adicionado com sucesso!');
        } catch (error) {
            console.error('Error creating comment:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
        }
        setCreateCommentLoading(false);
    };

    const handleAuthorPress = (userId: number) => {
        navigation.navigate('UserProfile', { userId });
    };

    const checkIfFavorite = async () => {
        const favorite = await favoritesStorage.isFavorite(postId);
        setIsFavorite(favorite);
    };

    const toggleFavorite = async () => {
        if (!currentPost) return;

        if (isFavorite) {
            dispatch(removeFavorite(currentPost.id));
            await favoritesStorage.removeFavorite(currentPost.id);
        } else {
            dispatch(addFavorite(currentPost));
            await favoritesStorage.addFavorite(currentPost);
        }

        setIsFavorite(!isFavorite);
    };

    if (postLoading || !currentPost) {
        return (
            <LoadingContainer>
                <ActivityIndicator size="large" color="#4F46E5" />
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <Content>
                <PostContainer>
                    <PostHeader>
                        <TitleContainer>
                            <Title>{currentPost.title}</Title>
                        </TitleContainer>

                        <FavoriteButton onPress={toggleFavorite}>
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={28}
                                color={isFavorite ? '#EF4444' : '#6B7280'}
                            />
                        </FavoriteButton>
                    </PostHeader>

                    <Body>{currentPost.body}</Body>

                    {viewedUser && (
                        <AuthorContainer onPress={() => handleAuthorPress(viewedUser.id)} activeOpacity={0.7}>
                            <UserAvatar name={viewedUser.name} size={40} uri={viewedUser.avatar} />
                            <AuthorInfo>
                                <AuthorName>{viewedUser.name}</AuthorName>
                                <AuthorUsername>@{viewedUser.username}</AuthorUsername>
                            </AuthorInfo>
                        </AuthorContainer>
                    )}
                </PostContainer>

                <CommentList
                    comments={comments}
                    loading={commentsLoading}
                    onAuthorPress={(email) => {
                        // Como JSONPlaceholder não relaciona comentários com usuários,
                        // podemos apenas exibir uma mensagem para este protótipo
                        Alert.alert('Info', `Email do autor: ${email}`);
                    }}
                />
            </Content>

            <CommentForm
                postId={postId}
                onSubmit={handleCreateComment}
                loading={createCommentLoading}
            />
        </Container>
    );
};

export default PostDetailsScreen;