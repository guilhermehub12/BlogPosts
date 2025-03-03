import styled from 'styled-components/native';
import { Animated } from 'react-native';

// Tema
export const theme = {
  colors: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    error: '#B00020',
    text: '#000000',
    disabled: '#A0A0A0',
    placeholder: '#7F7F7F',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
};

// Componentes base
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.m}px;
`;

export const Card = styled.TouchableOpacity`
  background-color: white;
  border-radius: ${theme.borderRadius.m}px;
  padding: ${theme.spacing.m}px;
  margin-bottom: ${theme.spacing.m}px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.s}px;
  color: ${theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${theme.colors.placeholder};
  margin-bottom: ${theme.spacing.s}px;
`;

export const Body = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.m}px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.m}px;
  border-radius: ${theme.borderRadius.m}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.m}px;
  border-radius: ${theme.borderRadius.m}px;
  margin-bottom: ${theme.spacing.m}px;
`;

export const AnimatedCard = Animated.createAnimatedComponent(Card);

export const TextArea = styled(Input)`
  min-height: 120px;
  text-align-vertical: top;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: ${theme.spacing.m}px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-vertical: ${theme.spacing.m}px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: ${theme.spacing.l}px;
  bottom: ${theme.spacing.l}px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 5;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
`;

export const SearchBar = styled.TextInput`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.m}px;
  border-radius: ${theme.borderRadius.l}px;
  margin-bottom: ${theme.spacing.m}px;
`;