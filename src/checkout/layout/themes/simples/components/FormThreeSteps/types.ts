// Interfaces TypeScript
export interface IFormData {
  // Etapa 1: Identificação
  email: string;
  telefone: string;
  nomeCompleto: string;
  cpf: string;

  // Etapa 2: Entrega
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  opcaoFrete: string;

  // Etapa 3: Pagamento
  ofertaAdquirida: boolean;
}

export interface IFreteOption {
  id: string;
  nome: string;
  prazo: string;
  preco: string;
  popular?: boolean;
}

export interface IViaCEPResponse {
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
