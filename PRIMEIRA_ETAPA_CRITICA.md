# 🚀 PRIMEIRA ETAPA PRIMORDIAL - GATEWAY DE PAGAMENTO

## 📊 ANÁLISE DO ESTADO ATUAL

Após análise completa do código, identifiquei que:

### ✅ O QUE JÁ ESTÁ IMPLEMENTADO NO FRONT-END:
1. **Autenticação** - Login e registro (estrutura completa)
2. **CRUD de Produtos** - Interface completa
3. **Checkout Visual** - Interface completa (3 passos)
4. **Coleta de Dados** - Cliente, endereço, carrinho

### ❌ O QUE ESTÁ FALTANDO (CRÍTICO):
1. **Processamento de Pedido** - NÃO EXISTE rota de criação de pedido
2. **Geração de QR Code PIX** - Valores estão mockados no front-end
3. **Webhook/Callback de Pagamento** - Não há verificação de status
4. **Criação de Venda/Sale** - Não há registro da venda no backend

---

## 🎯 PRIMEIRA ETAPA PRIMORDIAL

### **FLUXO DE PAGAMENTO - PROCESSAR PEDIDO**

Esta é a etapa que transforma o checkout em um pedido real com pagamento funcional.

---

## 📋 ETAPA 1: FLUXO COMPLETO DE PAGAMENTO PIX

### **1.1 Criar Pedido/Order** ⭐ PRIMEIRA ROTA CRÍTICA

**Método**: `POST`  
**Rota**: `/orders` ou `/checkout/process`  
**Autenticação**: ❌ NÃO requerida (checkout é público)  
**Body**:
```json
{
  "productId": "string",
  "offerId": "string",
  "customer": {
    "name": "string",
    "email": "string",
    "cellphone": "string",
    "cpf": "string"
  },
  "address": {
    "cep": "string",
    "address": "string",
    "number": "string",
    "neighborhood": "string",
    "city": "string",
    "state": "string",
    "complement": "string"
  },
  "cart": {
    "quantity": number,
    "orderBumps": [
      {
        "id": "string",
        "quantity": number
      }
    ],
    "shippingOption": {
      "id": "string"
    }
  },
  "paymentMethod": "PIX"
}
```

**Response**:
```json
{
  "data": {
    "orderId": "string",
    "status": "PENDING",
    "payment": {
      "id": "string",
      "method": "PIX",
      "pixQrcode": "string (base64 ou URL da imagem)",
      "pixCode": "string (código copia e cola)",
      "expiresAt": "2024-01-01T12:00:00Z",
      "amount": 99.90
    },
    "order": {
      "id": "string",
      "total": 99.90,
      "createdAt": "2024-01-01T12:00:00Z"
    }
  }
}
```

**O que fazer no backend**:
1. Validar dados do pedido
2. Buscar produto e oferta
3. Calcular total (produto + orderbumps + frete)
4. Criar registro de Order no banco (status: PENDING)
5. Integrar com gateway PIX (Asaas, Mercado Pago, etc.)
6. Gerar QR Code PIX
7. Salvar dados do pagamento
8. Retornar QR Code e código PIX

---

### **1.2 Verificar Status do Pagamento** ⭐ SEGUNDA ROTA CRÍTICA

**Método**: `GET`  
**Rota**: `/orders/:orderId/status`  
**Autenticação**: ❌ NÃO requerida (ou token público no query)  
**Query Params**: 
- `orderId`: string (opcional se usar na URL)

**Response**:
```json
{
  "data": {
    "orderId": "string",
    "status": "PENDING" | "PAID" | "EXPIRED" | "CANCELLED",
    "payment": {
      "status": "PENDING" | "PAID" | "EXPIRED",
      "paidAt": "2024-01-01T12:00:00Z" | null
    },
    "updatedAt": "2024-01-01T12:00:00Z"
  }
}
```

**Uso no front-end**: Polling a cada 5-10 segundos enquanto status for PENDING

---

### **1.3 Webhook de Confirmação de Pagamento** (Backend interno)

**Método**: `POST`  
**Rota**: `/webhooks/pix/payment` (endpoint interno, chamado pelo gateway)  
**Autenticação**: Header de segurança (token do gateway)  
**Body** (formato depende do gateway):
```json
{
  "event": "payment.confirmed",
  "orderId": "string",
  "paymentId": "string",
  "amount": 99.90,
  "paidAt": "2024-01-01T12:00:00Z"
}
```

**O que fazer**:
1. Validar token de segurança
2. Buscar pedido pelo orderId
3. Atualizar status para PAID
4. Criar registro de Sale (venda)
5. Enviar email de confirmação
6. Executar integrações (webhooks, pixels, etc.)
7. Liberar acesso ao produto (se digital)

---

## 🔄 FLUXO COMPLETO (MVP)

```
┌─────────────┐
│   CLIENTE   │
│  Acessa     │
│  Checkout   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ 1. Preenche dados (nome, email, etc.)  │
│ 2. Seleciona produto + orderbumps      │
│ 3. Seleciona frete (se físico)         │
│ 4. Clica em "Finalizar Pedido"         │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ POST /orders                            │
│ Backend:                                │
│ - Valida dados                          │
│ - Cria Order (PENDING)                  │
│ - Gera QR Code PIX                      │
│ - Salva pagamento                       │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Retorna QR Code PIX                     │
│ Frontend exibe:                         │
│ - QR Code                               │
│ - Código PIX (copia e cola)             │
│ - Contador de expiração                 │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Polling: GET /orders/:id/status         │
│ (a cada 5-10 segundos)                  │
└──────┬──────────────────────────────────┘
       │
       ▼ (quando gateway confirma)
┌─────────────────────────────────────────┐
│ Webhook recebe confirmação              │
│ Backend:                                │
│ - Atualiza Order → PAID                 │
│ - Cria Sale                             │
│ - Envia email                           │
│ - Executa integrações                   │
└──────┬──────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Status muda para PAID                   │
│ Frontend:                               │
│ - Mostra "Pagamento Confirmado"         │
│ - Redireciona para página de sucesso   │
│ - Libera acesso (se digital)            │
└─────────────────────────────────────────┘
```

---

## 🛠️ IMPLEMENTAÇÃO BACKEND - CHECKLIST

### Fase 1: Estrutura Base (2-3 dias)

- [ ] **Criar tabela `orders`**
  ```sql
  - id (UUID)
  - user_id (FK para users) - NULL se checkout público
  - product_id (FK)
  - offer_id (FK)
  - status (PENDING, PAID, EXPIRED, CANCELLED)
  - total (decimal)
  - customer_data (JSON)
  - address_data (JSON)
  - created_at
  - updated_at
  ```

- [ ] **Criar tabela `payments`**
  ```sql
  - id (UUID)
  - order_id (FK)
  - method (PIX, CREDIT_CARD, etc.)
  - status (PENDING, PAID, EXPIRED, FAILED)
  - amount (decimal)
  - pix_qrcode (text)
  - pix_code (text)
  - pix_expires_at (timestamp)
  - paid_at (timestamp nullable)
  - gateway_payment_id (string)
  - created_at
  - updated_at
  ```

- [ ] **Criar tabela `sales`** (já deve existir, verificar estrutura)
  ```sql
  - id (UUID)
  - order_id (FK)
  - user_id (FK)
  - product_id (FK)
  - amount (decimal)
  - status (string)
  - created_at
  ```

### Fase 2: Integração PIX (3-5 dias)

- [ ] **Escolher Gateway PIX**
  - Opções: Asaas, Mercado Pago, Gerencianet, PagSeguro
  - Recomendado: **Asaas** (simples e confiável para Brasil)

- [ ] **Configurar credenciais do gateway**
  - API Key
  - Webhook URL
  - Ambiente (sandbox/produção)

- [ ] **Implementar serviço de pagamento**
  - Função para criar cobrança PIX
  - Função para gerar QR Code
  - Função para verificar status

### Fase 3: Rotas da API (2-3 dias)

- [ ] **POST /orders**
  - Validação de dados
  - Cálculo de total
  - Criação de Order
  - Geração de PIX
  - Retorno de QR Code

- [ ] **GET /orders/:orderId/status**
  - Buscar order
  - Verificar status no gateway
  - Atualizar status local se necessário
  - Retornar status atual

- [ ] **POST /webhooks/pix/payment** (interno)
  - Validar token
  - Atualizar Order
  - Criar Sale
  - Executar integrações

### Fase 4: Testes (1-2 dias)

- [ ] Teste end-to-end completo
- [ ] Teste de expiração de QR Code
- [ ] Teste de webhook
- [ ] Teste de edge cases

---

## ⚡ POR QUE ESTA É A PRIMEIRA ETAPA?

1. **Sem pagamento, não há gateway funcional**
   - Todas as outras features dependem de vendas acontecendo

2. **Bloco fundamental**
   - Autenticação já está implementada no front
   - Produtos já podem ser criados
   - Checkout já coleta dados
   - **Falta apenas PROCESSAR o pagamento**

3. **MVP mínimo viável**
   - Com esta etapa, você pode:
     - Criar produtos
     - Processar pagamentos PIX
     - Registrar vendas
     - Ter um gateway funcional básico

4. **Validação rápida**
   - Em 1-2 semanas você tem vendas reais acontecendo
   - Permite testar com clientes reais
   - Gera receita para continuar desenvolvimento

---

## 📦 DEPENDÊNCIAS NECESSÁRIAS

### Antes de implementar, você precisa ter:

1. ✅ **Autenticação funcionando** 
   - Login/Registro
   - Proteção de rotas privadas

2. ✅ **CRUD de Produtos funcionando**
   - Criar produto
   - Buscar produto por ID
   - Criar oferta padrão

3. ⚠️ **Gateway PIX configurado**
   - Conta no Asaas/Mercado Pago/etc.
   - Credenciais de API
   - Webhook configurado

---

## 🎯 PRÓXIMAS ETAPAS (APÓS PAGAMENTO FUNCIONAR)

1. **Dashboard de Vendas** - Visualizar vendas processadas
2. **Webhooks de Integrações** - Conectar com UTMify, etc.
3. **Pixels de Rastreamento** - Facebook Pixel, Google Analytics
4. **Sistema de Saques** - Permitir saque para vendedor
5. **Notificações** - Email, SMS de confirmação

---

## 🚨 OBSERVAÇÕES IMPORTANTES

1. **Checkout é público** - Não requer autenticação para criar pedido
2. **Segurança** - Validar CPF, validar dados antes de processar
3. **Rate Limiting** - Proteger endpoint de criação de pedido
4. **Validação de Produto** - Verificar se produto está ativo
5. **Validação de Oferta** - Verificar se oferta existe e está válida
6. **Timeout de QR Code** - PIX geralmente expira em 30 minutos

---

## 📚 RECURSOS ÚTEIS

### Documentação de Gateways:
- **Asaas**: https://docs.asaas.com/
- **Mercado Pago**: https://www.mercadopago.com.br/developers/pt/docs
- **Gerencianet**: https://dev.gerencianet.com.br/

### Exemplo de Integração Asaas (PIX):
```javascript
// Criar cobrança PIX
const payment = await asaas.payments.create({
  customer: customerId,
  billingType: 'PIX',
  value: 99.90,
  dueDate: new Date(Date.now() + 24*60*60*1000), // 24h
});

// Retorna:
// - payment.id
// - payment.pixQrCodeBase64 (QR Code)
// - payment.pixCopiaECola (código)
```

---

**RESUMO**: Implemente primeiro o fluxo de criação de pedido + geração de PIX + webhook de confirmação. Isso torna o gateway funcional e permite validar o negócio rapidamente.

