export type AccountType = "PERSON" | "COMPANY";

interface UserMeBase {
  type: AccountType;
  email: string;
  status: string;
  fixTax: number;
  percentTax: number;
}

export interface UserMePerson extends UserMeBase {
  type: "PERSON";
  name: string;
  cpf: string;
}

export interface UserMeCompany extends UserMeBase {
  type: "COMPANY";
  companyName: string;
  tradeName: string;
  cnpj: string;
}

export type UserMeData = UserMePerson | UserMeCompany;

export interface Award {
  id: string;
  title: string;
  icon: string;
  description: string;
  image: string | null;
  minValue: string;
  typeValue: string;
}

export interface UserAwardsData {
  sales: string;
  awardsUnlocked: Award[];
  nextAward: Award | null;
}

export interface UserAwardsResponse {
  success: boolean;
  data: UserAwardsData;
}
