import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchUserById } from '../store/reducers/usersSlice';
import { fetchPostsByUser } from '../store/reducers/postsSlice';
import { UserInfo } from '../components/user/UserInfo';
import { PostList } from '../components/post/PostList';
import styled from 'styled-components/native';

type ProfileRouteProp = RouteProp<{ UserProfile: { userId?: number } }, 'UserProfile'>;

const Container = styled(View)`
  flex: 1;
  background-color: #F9FAFB;
`;

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  padding: 16px;
  padding-bottom: 0;
  background-color: #F9FAFB;
`;

const ProfileScreen = () => {
    const route = useRoute<ProfileRouteProp>();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    // O userId da rota é opcional - se não for fornecido, mostra o perfil do usuário atual
    const { userId } = route.params || {};
    const { currentUser, viewedUser, loading: userLoading } = useAppSelector(state => state.users);
    const { posts, loading: postsLoading } = useAppSelector(state => state.posts);

    const userToDisplay = userId ? viewedUser : currentUser;
    const isCurrentUserProfile = !userId;

    useEffect(() => {
        if (userId && userId !== viewedUser?.id) {
            dispatch(fetchUserById(userId));
        }
    }, [userId, dispatch]);

    useEffect(() => {
        if (userToDisplay) {
            dispatch(fetchPostsByUser(userToDisplay.id));
        }
    }, [userToDisplay, dispatch]);

    const handlePostPress = (postId: number) => {
        navigation.navigate('PostDetails', { postId });
    };

    const handleAuthorPress = (authorId: number) => {
        if (authorId !== userToDisplay?.id) {
            navigation.navigate('UserProfile', { userId: authorId });
        }
    };

    if (!userToDisplay) {
        return null;
    }

    return (
        <Container>
            <ScrollView>
                <UserInfo user={userToDisplay} />

                <SectionTitle>Postagens</SectionTitle>

                <PostList
                    posts={posts}
                    loading={postsLoading}
                    onRefresh={() => dispatch(fetchPostsByUser(userToDisplay.id))}
                    onPostPress={handlePostPress}
                    onAuthorPress={handleAuthorPress}
                    emptyMessage={
                        isCurrentUserProfile
                            ? "Você ainda não criou nenhuma postagem"
                            : "Este usuário ainda não criou nenhuma postagem"
                    }
                />
            </ScrollView>
        </Container>
    );
};

export default ProfileScreen;