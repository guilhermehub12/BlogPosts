import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit?: () => void;
    onClear?: () => void;
    placeholder?: string;
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #F3F4F6;
  border-radius: 24px;
  padding: 0 12px;
  margin: 8px 16px;
  height: 48px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  margin-left: 8px;
  color: #1F2937;
`;

const IconButton = styled(TouchableOpacity)`
  padding: 4px;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    onSubmit,
    onClear,
    placeholder = 'Pesquisar...',
}) => {
    return (
        <Container>
            <Ionicons name="search" size={20} color="#6B7280" />
            <SearchInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                returnKeyType="search"
                onSubmitEditing={onSubmit}
            />
            {value.length > 0 && (
                <IconButton onPress={onClear}>
                    <Ionicons name="close-circle" size={20} color="#6B7280" />
                </IconButton>
            )}
        </Container>
    );
};
