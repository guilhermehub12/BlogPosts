import api from "./index";
import { User } from "../../types/user";

export const userService = {
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Função para gerar avatar usando ui-avatars.com
  generateUserAvatar: (name: string, size: number = 150): string => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&size=${size}&background=random`;
  },
};
