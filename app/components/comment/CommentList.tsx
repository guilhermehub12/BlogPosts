import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Comment } from '../../types/comment';
import { CommentItem } from './CommentItem';

interface CommentListProps {
    comments: Comment[];
    loading: boolean;
    onAuthorPress: (email: string) => void;
}

const Container = styled(View)`
  padding: 16px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
`;

const EmptyContainer = styled(View)`
  align-items: center;
  padding: 16px 0;
`;

const EmptyText = styled(Text)`
  font-size: 14px;
  color: #6B7280;
`;

const LoadingContainer = styled(View)`
  padding: 16px 0;
  align-items: center;
`;

export const CommentList: React.FC<CommentListProps> = ({
    comments,
    loading,
    onAuthorPress,
}) => {
    if (loading) {
        return (
            <Container>
                <Title>Comentários</Title>
                <LoadingContainer>
                    <ActivityIndicator size="small" color="#4F46E5" />
                </LoadingContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Comentários ({comments.length})</Title>
            {comments.length === 0 ? (
                <EmptyContainer>
                    <EmptyText>Nenhum comentário ainda. Seja o primeiro a comentar!</EmptyText>
                </EmptyContainer>
            ) : (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onAuthorPress={onAuthorPress}
                    />
                ))
            )}
        </Container>
    );
};
