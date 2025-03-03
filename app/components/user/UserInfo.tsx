import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../../types/user';
import { UserAvatar } from './UserAvatar';

interface UserInfoProps {
    user: UserProfile;
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #FFFFFF;
  padding: 16px;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: 24px;
`;

const NameText = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-top: 12px;
`;

const UsernameText = styled(Text)`
  font-size: 16px;
  color: #6B7280;
  margin-top: 4px;
`;

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #4B5563;
  margin-bottom: 12px;
  margin-top: 16px;
`;

const InfoItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const InfoLabel = styled(Text)`
  font-size: 14px;
  color: #6B7280;
  margin-left: 8px;
`;

const CompanyContainer = styled(View)`
  background-color: #F3F4F6;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
`;

const CompanyName = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #4B5563;
  margin-bottom: 4px;
`;

const CompanyInfo = styled(Text)`
  font-size: 14px;
  color: #6B7280;
`;

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <Container showsVerticalScrollIndicator={false}>
            <Header>
                <UserAvatar name={user.name} size={120} uri={user.avatar} />
                <NameText>{user.name}</NameText>
                <UsernameText>@{user.username}</UsernameText>
            </Header>

            <SectionTitle>Informações de Contato</SectionTitle>

            <InfoItem>
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <InfoLabel>{user.email}</InfoLabel>
            </InfoItem>

            <InfoItem>
                <Ionicons name="call-outline" size={20} color="#6B7280" />
                <InfoLabel>{user.phone}</InfoLabel>
            </InfoItem>

            <InfoItem>
                <Ionicons name="globe-outline" size={20} color="#6B7280" />
                <InfoLabel>{user.website}</InfoLabel>
            </InfoItem>

            <SectionTitle>Endereço</SectionTitle>

            <InfoItem>
                <Ionicons name="location-outline" size={20} color="#6B7280" />
                <InfoLabel>
                    {user.address}
                </InfoLabel>
            </InfoItem>

            <SectionTitle>Empresa</SectionTitle>

            <CompanyContainer>
                <CompanyName>{user.company}</CompanyName>
            </CompanyContainer>
        </Container>
    );
};