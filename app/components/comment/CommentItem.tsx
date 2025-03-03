import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Comment } from '../../types/comment';

interface CommentItemProps {
    comment: Comment;
    onAuthorPress: (email: string) => void;
}

const Container = styled(View)`
  background-color: #F3F4F6;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const AuthorContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const AuthorName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: #4B5563;
  margin-left: 8px;
`;

const CommentBody = styled(Text)`
  font-size: 14px;
  color: #6B7280;
  line-height: 20px;
`;

export const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    onAuthorPress,
}) => {
    return (
        <Container>
            <Header>
                <AuthorContainer onPress={() => onAuthorPress(comment.email)} activeOpacity={0.7}>
                    <Ionicons name="person-circle-outline" size={20} color="#6B7280" />
                    <AuthorName>{comment.name}</AuthorName>
                </AuthorContainer>
            </Header>
            <CommentBody>{comment.body}</CommentBody>
        </Container>
    );
};
