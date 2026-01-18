export const validatePhone = (cellphone: string): boolean => {
  const cellphoneClean = cellphone.replace(/\D/g, "");
  return cellphoneClean.length >= 10;
};

export const validateCEP = (cep: string): boolean => {
  const cepClean = cep.replace(/\D/g, "");
  return cepClean.length === 8;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const cpfClean = cpf.replace(/\D/g, "");
  if (cpfClean.length !== 11) return false;

  // Validação básica de CPF
  if (/^(\d)\1{10}$/.test(cpfClean)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfClean.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfClean.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfClean.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfClean.charAt(10))) return false;

  return true;
};
