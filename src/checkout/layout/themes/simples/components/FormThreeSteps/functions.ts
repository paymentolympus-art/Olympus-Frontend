interface Response {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const searchCEP = async (cep: string): Promise<Response | null> => {
  try {
    const cepClean = cep.replace(/\D/g, "");
    if (cepClean.length !== 8) return null;

    const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
    const data = await response.json();

    if (data.erro) return null;

    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};
