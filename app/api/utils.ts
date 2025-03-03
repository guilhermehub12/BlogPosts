import axios, { AxiosError } from 'axios';

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Resposta do servidor com erro
      return `Erro ${axiosError.response.status}: ${axiosError.response.statusText}`;
    } else if (axiosError.request) {
      // Sem resposta do servidor
      return 'Servidor indisponível. Verifique sua conexão.';
    } else {
      // Erro na configuração da requisição
      return `Erro na requisição: ${axiosError.message}`;
    }
  }
  // Erro desconhecido
  return 'Ocorreu um erro inesperado.';
};

export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return !axiosError.response;
  }
  return false;
};
