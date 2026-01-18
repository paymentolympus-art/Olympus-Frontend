import { cpf, cnpj } from "cpf-cnpj-validator";

export const formatCPF = (value: string): string => {
  const rawValue = value.replace(/\D/g, "");
  if (rawValue.length <= 11) {
    return cpf.format(rawValue);
  }
  return value;
};

export const formatCNPJ = (value: string): string => {
  const rawValue = value.replace(/\D/g, "");
  if (rawValue.length <= 14) {
    return cnpj.format(rawValue);
  }
  return value;
};

export const formatPhone = (value: string): string => {
  const rawValue = value.replace(/\D/g, "");
  if (rawValue.length <= 11) {
    if (rawValue.length <= 10) {
      return rawValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return rawValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  }
  return value;
};

export const formatDate = (value: string): string => {
  const rawValue = value.replace(/\D/g, "");
  if (rawValue.length <= 8) {
    return rawValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
  return value;
};
