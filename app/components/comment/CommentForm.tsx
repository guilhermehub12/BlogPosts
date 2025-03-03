import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CreateCommentPayload } from '../../types/comment';

interface CommentFormProps {
    postId: number;
    onSubmit: (comment: CreateCommentPayload) => void;
    loading: boolean;
}

const Container = styled(KeyboardAvoidingView)`
  padding: 16px;
  background-color: #FFFFFF;
  border-top-width: 1px;
  border-top-color: #E5E7EB;
`;

const ButtonContainer = styled(View)`
  margin-top: 8px;
`;

export const CommentForm: React.FC<CommentFormProps> = ({
    postId,
    onSubmit,
    loading,
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        body: '',
    });

    const validate = (): boolean => {
        const newErrors = {
            name: '',
            email: '',
            body: '',
        };

        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido';
        }

        if (!body.trim()) {
            newErrors.body = 'Comentário é obrigatório';
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.body;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit({
                postId,
                name,
                email,
                body,
            });

            // Limpar campos após envio
            setName('');
            setEmail('');
            setBody('');
        }
    };

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Input
                label="Nome"
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
                error={errors.name}
            />

            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="seu.email@exemplo.com"
                error={errors.email}
            />

            <Input
                label="Comentário"
                value={body}
                onChangeText={setBody}
                placeholder="Seu comentário..."
                multiline
                numberOfLines={3}
                error={errors.body}
            />

            <ButtonContainer>
                <Button
                    title="Enviar comentário"
                    onPress={handleSubmit}
                    loading={loading}
                    fullWidth
                />
            </ButtonContainer>
        </Container>
    );
};