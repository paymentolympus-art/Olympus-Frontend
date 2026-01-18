/**
 * Tipos para o FormTwoSteps
 *
 * Simplificado para conter apenas dados de identificação e pagamento
 * Sem campos de entrega (CEP, endereço, etc.)
 */

// Interface para dados do formulário (apenas identificação)
export interface IFormData {
  // Etapa 1: Identificação
  email: string;
  telefone: string;
  nomeCompleto: string;
  cpf: string;

  // Etapa 2: Pagamento
  ofertaAdquirida: boolean;
}

// Interface para opção de frete (mantida para compatibilidade)
export interface IFreteOption {
  id: string;
  nome: string;
  prazo: string;
  preco: string;
  popular?: boolean;
}
