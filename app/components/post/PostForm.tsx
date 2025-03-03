import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CreatePostPayload } from '../../types/post';

interface PostFormProps {
    onSubmit: (post: CreatePostPayload) => void;
    loading: boolean;
    userId: number;
}

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: #FFFFFF;
`;

const FormContainer = styled(ScrollView)`
  flex: 1;
  padding: 16px;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 24px;
`;

const ButtonContainer = styled(View)`
  margin-top: 24px;
`;

export const PostForm: React.FC<PostFormProps> = ({
    onSubmit,
    loading,
    userId,
}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        body: '',
    });

    const validate = (): boolean => {
        const newErrors = {
            title: '',
            body: '',
        };

        if (!title.trim()) {
            newErrors.title = 'O título é obrigatório';
        }

        if (!body.trim()) {
            newErrors.body = 'O conteúdo é obrigatório';
        }

        setErrors(newErrors);
        return !newErrors.title && !newErrors.body;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit({
                title,
                body,
                userId,
            });
        }
    };

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <FormContainer
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Title>Nova Postagem</Title>

                <Input
                    label="Título"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Digite o título da postagem"
                    error={errors.title}
                />

                <Input
                    label="Conteúdo"
                    value={body}
                    onChangeText={setBody}
                    placeholder="Digite o conteúdo da postagem"
                    multiline
                    numberOfLines={8}
                    error={errors.body}
                />

                <ButtonContainer>
                    <Button
                        title="Publicar"
                        onPress={handleSubmit}
                        loading={loading}
                        fullWidth
                    />
                </ButtonContainer>
            </FormContainer>
        </Container>
    );
};