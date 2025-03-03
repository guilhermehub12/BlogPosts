import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    secureTextEntry?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
}

const InputContainer = styled(View)`
  margin-bottom: 16px;
  width: 100%;
`;

const InputLabel = styled(Text)`
  font-size: 14px;
  margin-bottom: 6px;
  color: #374151;
  font-weight: 500;
`;

const StyledInput = styled(TextInput) <{
    hasError: boolean;
    multiline: boolean;
}>`
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? '#EF4444' : '#D1D5DB')};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  background-color: #F9FAFB;
  color: #1F2937;
  min-height: ${(props) => (props.multiline ? '100px' : 'auto')};
  text-align-vertical: ${(props) => (props.multiline ? 'top' : 'center')};
`;

const ErrorText = styled(Text)`
  color: #EF4444;
  font-size: 12px;
  margin-top: 4px;
`;

export const Input: React.FC<InputProps> = ({
    value,
    onChangeText,
    placeholder,
    label,
    error,
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 4,
}) => {
    return (
        <InputContainer>
            {label && <InputLabel>{label}</InputLabel>}
            <StyledInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={multiline ? numberOfLines : 1}
                hasError={!!error}
                placeholderTextColor="#9CA3AF"
            />
            {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>
    );
};
