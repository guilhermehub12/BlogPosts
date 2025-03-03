import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createPost } from '../store/reducers/postsSlice';
import { PostForm } from '../components/post/PostForm';
import { CreatePostPayload } from '../types/post';
import { useOffline } from '../hooks/useOffline';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  background-color: #FFFFFF;
`;

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.posts);
  const { currentUser } = useAppSelector(state => state.users);
  const { isOffline, createPostOffline } = useOffline();

  const handleCreatePost = async (post: CreatePostPayload) => {
    try {
      if (isOffline) {
        // Cria o post offline
        await createPostOffline(post);
        Alert.alert(
          "Post criado offline",
          "Seu post foi salvo e será publicado quando você estiver online novamente.",
          [{ text: "OK", onPress: () => navigation.navigate('HomeStack') }]
        );
      } else {
        // Cria o post online
        const resultAction = await dispatch(createPost(post));
        
        if (createPost.fulfilled.match(resultAction)) {
          Alert.alert(
            "Post criado com sucesso",
            "Seu post foi publicado com sucesso!",
            [{ text: "OK", onPress: () => navigation.navigate('HomeStack') }]
          );
        } else {
          Alert.alert(
            "Erro",
            "Ocorreu um erro ao criar o post. Tente novamente.",
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao criar o post. Tente novamente.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <Container>
      <PostForm
        onSubmit={handleCreatePost}
        loading={loading}
        userId={currentUser?.id || 1}
      />
    </Container>
  );
};

export default CreatePostScreen;