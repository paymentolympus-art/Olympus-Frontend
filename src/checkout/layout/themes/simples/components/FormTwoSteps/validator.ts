/**
 * Funções de validação para o FormTwoSteps
 */

// Valida formato do telefone (mínimo 10 dígitos)
export const validatePhone = (cellphone: string): boolean => {
  const cellphoneClean = cellphone.replace(/\D/g, "");
  return cellphoneClean.length >= 10;
};

// Valida formato do email
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valida CPF com algoritmo completo
export const validateCPF = (cpf: string): boolean => {
  const cpfClean = cpf.replace(/\D/g, "");

  // CPF deve ter 11 dígitos
  if (cpfClean.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cpfClean)) return false;

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfClean.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfClean.charAt(9))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfClean.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfClean.charAt(10))) return false;

  return true;
};
