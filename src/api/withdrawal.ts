import api from "@/lib/axios";
import type {
  WithdrawalBalance,
  WithdrawalListResponse,
  CreateWithdrawalData,
  CreateWithdrawalResponse,
  SendCodeResponse,
  PixKeysResponse,
  CreatePixKeyData,
  PixKey,
  DeletePixKeyData,
  CodeType,
} from "@/types/withdrawal";

export class WithdrawalService {
  static async getBalance(): Promise<WithdrawalBalance> {
    const response = await api.get("/user/withdrawal/balance");
    return response.data.data;
  }

  static async getWithdrawals(
    page: number = 1,
    limit: number = 10
  ): Promise<WithdrawalListResponse> {
    const response = await api.get(
      `/user/withdrawal?page=${page}&limit=${limit}`
    );
    return response.data.data;
  }

  static async createWithdrawal(
    data: CreateWithdrawalData
  ): Promise<CreateWithdrawalResponse> {
    const response = await api.post("/user/withdrawal", data);
    return response.data.data;
  }

  static async sendCode(type?: CodeType): Promise<SendCodeResponse> {
    const params = type ? { params: { type } } : {};
    const response = await api.post("/user/withdrawal/send-code", {}, params);
    return response.data.data;
  }

  static async getPixKeys(): Promise<PixKeysResponse> {
    const response = await api.get("/user/withdrawal/pix-key");
    return response.data.data;
  }

  static async createPixKey(data: CreatePixKeyData): Promise<PixKey> {
    const response = await api.post("/user/withdrawal/pix-key", data);
    return response.data.data;
  }

  static async deletePixKey(
    pixKeyId: string,
    data: DeletePixKeyData
  ): Promise<{ message: string }> {
    const response = await api.delete(`/user/withdrawal/pix-key/${pixKeyId}`, {
      data,
    });
    return response.data.data;
  }
}
