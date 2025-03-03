import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../types/post';
import { User } from '../../types/user';
import { userService } from '../../services/api/users';
import { useAppDispatch } from '../../store/hooks';
import { addFavorite, removeFavorite } from '../../store/reducers/favoritesSlice';
import { favoritesStorage } from '../../utils/storage';

interface PostCardProps {
  post: Post;
  onPress: () => void;
  onAuthorPress: (userId: number) => void;
  isFavorite: boolean;
}

const Container = styled(TouchableOpacity)`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  flex: 1;
`;

const AuthorContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const AuthorName = styled(Text)`
  font-size: 14px;
  color: #6B7280;
  margin-left: 8px;
`;

const Body = styled(Text)`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 12px;
  line-height: 20px;
`;

const FavoriteButton = styled(TouchableOpacity)`
  padding: 8px;
`;

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  onAuthorPress,
  isFavorite,
}) => {
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState<User | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const user = await userService.getUserById(post.userId);
        setAuthor(user);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };

    fetchAuthor();
  }, [post.userId]);

  const toggleFavorite = async () => {
    // Animar o coração
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (isFavorite) {
      dispatch(removeFavorite(post.id));
      await favoritesStorage.removeFavorite(post.id);
    } else {
      dispatch(addFavorite(post));
      await favoritesStorage.addFavorite(post);
    }
  };

  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <Header>
        <Title numberOfLines={2}>{post.title}</Title>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <FavoriteButton onPress={toggleFavorite}>
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? '#EF4444' : '#6B7280'} 
            />
          </FavoriteButton>
        </Animated.View>
      </Header>
      
      <Body numberOfLines={3}>{post.body}</Body>
      
      {author && (
        <AuthorContainer onPress={() => onAuthorPress(post.userId)} activeOpacity={0.7}>
          <Ionicons name="person-circle-outline" size={18} color="#6B7280" />
          <AuthorName>@{author.username}</AuthorName>
        </AuthorContainer>
      )}
    </Container>
  );
};
