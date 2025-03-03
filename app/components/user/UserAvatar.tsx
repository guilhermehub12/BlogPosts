import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import { userService } from '../../services/api/users';

interface UserAvatarProps {
    name: string;
    size?: number;
    uri?: string;
}

const AvatarContainer = styled(View) <{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  overflow: hidden;
  background-color: #E5E7EB;
`;

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const UserAvatar: React.FC<UserAvatarProps> = ({
    name,
    size = 50,
    uri,
}) => {
    const avatarUri = uri || userService.generateUserAvatar(name, size);

    return (
        <AvatarContainer size={size}>
            <AvatarImage
                source={{ uri: avatarUri }}
                resizeMode="cover"
            />
        </AvatarContainer>
    );
};
