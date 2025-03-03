import axios from 'axios';
import { ENDPOINTS } from '../endpoints';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserProfile extends User {
  avatar: string;
}

const usersService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get(ENDPOINTS.USERS);
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(ENDPOINTS.USER_BY_ID(id));
    return response.data;
  },

  // Função para gerar avatar usando ui-avatars.com
  generateUserAvatar: (name: string, size: number = 150): string => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=random`;
  },

  // Função para obter usuário com avatar
  getUserWithAvatar: async (id: number): Promise<UserProfile> => {
    const user = await usersService.getUserById(id);
    return {
      ...user,
      avatar: usersService.generateUserAvatar(user.name)
    };
  }
};

export default usersService;