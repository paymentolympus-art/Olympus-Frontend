import type { FinalPFData } from "@/validators/register-final";
import type { FinalPJData } from "@/validators/register-final";
import { type LoginFormData } from "@/validators/login";
import {
  type ChangePasswordFormData,
  type Disable2FAFormData,
} from "@/validators/configuration";
import { AxiosError } from "axios";
import { clearSessionToken, setSessionToken } from "@/lib/cookies";
import {
  setUserData,
  clearAuthData,
  setLocalSessionToken,
} from "@/lib/local-storage";
import api from "@/lib/axios";

export const loginUser = async (data: LoginFormData) => {
  try {
    const body = {
      email: data.email,
      password: data.password,
    };

    const response = await api.post("/auth/session", body);
    const { session, user, message } = response.data.data;
    // Salvar o token se existir na resposta
    if (session) {
      setSessionToken(session);
      setLocalSessionToken(session);
    }

    if (user) {
      setUserData(user);
    }

    return message;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro desconhecido";
      throw new Error(msg);
    }

    throw new Error("Erro ao realizar login");
  }
};

export const registerUser = async (data: FinalPFData | FinalPJData) => {
  try {
    const baseBody: any = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      acceptTerms: data.acceptTerms,
      accountType: data.accountType,
    };

    // Adiciona campos específicos baseado no tipo de conta
    if (data.accountType === "PERSON") {
      const pfData = data as FinalPFData;
      baseBody.cpf = pfData.cpf.replace(/\D/g, "");
      baseBody.phone = pfData.phone.replace(/\D/g, "");
      // Converter data de DD/MM/YYYY para YYYY-MM-DD
      if (pfData.birthDate) {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = pfData.birthDate.match(dateRegex);
        if (match) {
          const [, day, month, year] = match;
          baseBody.birthDate = `${year}-${month}-${day}`;
        } else {
          baseBody.birthDate = pfData.birthDate;
        }
      }
    } else if (data.accountType === "COMPANY") {
      const pjData = data as FinalPJData;
      baseBody.cnpj = pjData.companyCnpj.replace(/\D/g, "");
      baseBody.companyName = pjData.companyName;
      baseBody.tradeName = pjData.tradeName;
      baseBody.phone = pjData.phone.replace(/\D/g, "");
    }

    const response = await api.post("/user/create", baseBody);
    const { message } = response.data.data;
    return message;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro desconhecido";

      throw new Error(msg);
    }

    throw new Error("Erro ao registrar usuário");
  }
};

// Função para fazer logout
export const logoutUser = () => {
  clearSessionToken();
  clearAuthData();
  // Você pode adicionar uma chamada para a API de logout aqui se necessário
};

// Função para buscar dados completos do usuário
export const getUserMe = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao buscar dados do usuário";
      throw new Error(msg);
    }

    throw new Error("Erro ao buscar dados do usuário");
  }
};

// Função para solicitar código de verificação para mudança de senha
export const requestPasswordChangeCode = async () => {
  try {
    const response = await api.post("/user/password/request-code");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao solicitar código de verificação";
      throw new Error(msg);
    }

    throw new Error("Erro ao solicitar código de verificação");
  }
};

// Função para alterar senha
export const changePassword = async (data: ChangePasswordFormData) => {
  try {
    const body = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      code: data.code,
    };

    const response = await api.post("/user/password/change", body);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao alterar senha";
      throw new Error(msg);
    }

    throw new Error("Erro ao alterar senha");
  }
};

// Função para ativar 2FA
export const enable2FA = async () => {
  try {
    const response = await api.post("/user/2fa/enable");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao ativar autenticação de dois fatores";
      throw new Error(msg);
    }

    throw new Error("Erro ao ativar autenticação de dois fatores");
  }
};

// Função para solicitar código de verificação por email
export const requestEmailCode = async () => {
  try {
    const response = await api.post("/user/email/send-code");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao solicitar código de verificação";
      throw new Error(msg);
    }

    throw new Error("Erro ao solicitar código de verificação");
  }
};

// Função para desativar 2FA
export const disable2FA = async (data: Disable2FAFormData) => {
  try {
    const body = {
      password: data.password,
      code: data.code,
    };

    const response = await api.post("/user/2fa/disable", body);
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao desativar autenticação de dois fatores";
      throw new Error(msg);
    }

    throw new Error("Erro ao desativar autenticação de dois fatores");
  }
};

// Função para verificar status do 2FA
export const get2FAStatus = async () => {
  try {
    const response = await api.get("/user/2fa/status");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao verificar status do 2FA";
      throw new Error(msg);
    }

    throw new Error("Erro ao verificar status do 2FA");
  }
};

// Função para buscar dados de awards do usuário
export const getUserAwards = async () => {
  try {
    const response = await api.get("/user/me/awards");
    return response.data.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao buscar dados de awards";
      throw new Error(msg);
    }

    throw new Error("Erro ao buscar dados de awards");
  }
};

// Função para buscar métricas gerais do dashboard
export const getUserMetrics = async () => {
  try {
    const response = await api.get("/user/me/metrics");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao buscar métricas do usuário";
      throw new Error(msg);
    }

    throw new Error("Erro ao buscar métricas do usuário");
  }
};

// Função para buscar dados do gráfico de vendas/visitantes
export const getUserAnalyticsChart = async (
  period: "7_DAYS" | "30_DAYS" | "3_MONTHS" = "30_DAYS"
) => {
  try {
    const response = await api.get("/user/me/analytics/chart", {
      params: { period },
    });
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;

    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.message ||
        "Erro ao buscar dados do gráfico";
      throw new Error(msg);
    }

    throw new Error("Erro ao buscar dados do gráfico");
  }
};
