import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
}

const ButtonContainer = styled(TouchableOpacity) <{
    variant: 'primary' | 'secondary' | 'outline';
    disabled: boolean;
    fullWidth: boolean;
}>`
  background-color: ${(props) => {
        if (props.disabled) return '#ccc';
        if (props.variant === 'primary') return '#4F46E5';
        if (props.variant === 'secondary') return '#9333EA';
        return 'transparent';
    }};
  
  border-width: ${(props) => (props.variant === 'outline' ? '1px' : '0')};
  border-color: ${(props) => (props.variant === 'outline' ? '#4F46E5' : 'transparent')};
  
  border-radius: 8px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const ButtonText = styled(Text) <{
    variant: 'primary' | 'secondary' | 'outline';
    disabled: boolean;
}>`
  color: ${(props) => {
        if (props.disabled) return '#888';
        if (props.variant === 'outline') return '#4F46E5';
        return '#fff';
    }};
  font-size: 16px;
  font-weight: 600;
`;

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    fullWidth = false,
}) => {
    return (
        <ButtonContainer
            onPress={onPress}
            variant={variant}
            disabled={disabled || loading}
            fullWidth={fullWidth}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator size="small" color={variant === 'outline' ? '#4F46E5' : '#fff'} />
            ) : (
                <ButtonText variant={variant} disabled={disabled}>
                    {title}
                </ButtonText>
            )}
        </ButtonContainer>
    );
};
