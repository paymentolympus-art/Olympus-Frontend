// Utilitários para gerenciar localStorage

// Chaves para localStorage
const STORAGE_KEYS = {
  USER: "user",
  SESSION_TOKEN: "session_token",
} as const;

// Interface para os dados do usuário
export interface UserData {
  email: string;
  id: string;
  name: string;
  status: string;
}

// Funções genéricas para localStorage
export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Erro ao ler do localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Erro ao remover do localStorage:", error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Erro ao limpar localStorage:", error);
  }
};

// Funções específicas para dados do usuário
export const setUserData = (userData: UserData) => {
  setLocalStorage(STORAGE_KEYS.USER, userData);
};

export const setLocalSessionToken = (token: string) => {
  setLocalStorage(STORAGE_KEYS.SESSION_TOKEN, token);
};

export const getUserData = (): UserData | null => {
  return getLocalStorage<UserData>(STORAGE_KEYS.USER);
};

export const getLocalSessionToken = (): string | null => {
  return getLocalStorage<string>(STORAGE_KEYS.SESSION_TOKEN);
};

export const removeLocalSessionToken = () => {
  removeLocalStorage(STORAGE_KEYS.SESSION_TOKEN);
};

export const removeUserData = () => {
  removeLocalStorage(STORAGE_KEYS.USER);
};

// Função para limpar todos os dados de autenticação
export const clearAuthData = () => {
  removeUserData();
  removeLocalSessionToken();
};
