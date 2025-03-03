import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingButtonProps {
    onPress: () => void;
    icon?: string;
}

const ButtonContainer = styled(TouchableOpacity)`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #4F46E5;
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const FloatingButton: React.FC<FloatingButtonProps> = ({
    onPress,
    icon = 'add',
}) => {
    return (
        <ButtonContainer onPress={onPress} activeOpacity={0.8}>
            <Ionicons name={icon as any} size={24} color="#FFFFFF" />
        </ButtonContainer>
    );
};