export type WithdrawalStatus = "PENDING" | "TRANSFERRED" | "CANCELLED";
export type WithdrawalType = "PIX";
export type PixKeyType = "EMAIL" | "CPF" | "CNPJ" | "PHONE" | "RANDOM";
export type CodeType = "WITHDRAWAL" | "PIX_KEY";

export interface WithdrawalBalance {
  availableBalance: number;
  pendingBalance: number;
  withdrawalTax: number;
}

export interface Withdrawal {
  id: string;
  valueNet: number;
  withdrawalTax: number;
  typeWithdrawal: WithdrawalType;
  keyWithdrawal: string;
  statusWithdrawal: WithdrawalStatus;
  createdAt: string;
}

export interface WithdrawalListResponse {
  withdrawals: Withdrawal[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateWithdrawalData {
  value: number;
  code: string;
  pixKeyId: string;
}

export interface CreateWithdrawalResponse {
  id: string;
}

export interface SendCodeResponse {
  message: string;
  expiresIn: number;
}

export interface PixKey {
  id: string;
  type: PixKeyType;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface PixKeysResponse {
  pixKeys: PixKey[];
}

export interface CreatePixKeyData {
  type: PixKeyType;
  value: string;
  code: string;
}

export interface DeletePixKeyData {
  code: string;
}
