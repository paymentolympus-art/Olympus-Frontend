# 📋 ANÁLISE COMPLETA DAS REQUISIÇÕES FRONT-END → BACK-END

## 🔧 Configuração Base

### Axios Instance (`src/lib/axios.ts`)
- **Base URL**: `import.meta.env.VITE_URL` (variável de ambiente)
- **Configuração**:
  - `withCredentials: true` (suporte a cookies)
  - Headers padrão: `Content-Type: application/json`
- **Interceptor de Resposta**:
  - Redireciona para `/login` em caso de erro 401 (não autenticado)
  - Limpa tokens e dados de autenticação automaticamente

### Autenticação de Requisições
Todos os serviços (exceto `user.ts` para login/registro) usam um interceptor que adiciona o token no header:
```typescript
Authorization: Bearer ${token}
```
O token é obtido de `localStorage` através de `getLocalSessionToken()`.

---

## 📡 REQUISIÇÕES POR MÓDULO

### 🔐 1. AUTENTICAÇÃO E USUÁRIO (`src/api/user.ts`)

#### 1.1 Login
- **Método**: `POST`
- **Rota**: `/auth/session`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "data": {
      "session": "token_string",
      "user": { "id", "name", "email", "status" },
      "message": "string"
    }
  }
  ```
- **Armazenamento**: Token salvo em cookie (`session_token`) e localStorage

#### 1.2 Registro de Usuário
- **Método**: `POST`
- **Rota**: `/user/create`
- **Body** (Pessoa Física):
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "acceptTerms": boolean,
    "accountType": "PERSON",
    "cpf": "string (sem formatação)",
    "phone": "string (sem formatação)",
    "birthDate": "YYYY-MM-DD"
  }
  ```
- **Body** (Pessoa Jurídica):
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "acceptTerms": boolean,
    "accountType": "COMPANY",
    "cnpj": "string (sem formatação)",
    "companyName": "string",
    "tradeName": "string",
    "phone": "string (sem formatação)"
  }
  ```

#### 1.3 Buscar Dados do Usuário Logado
- **Método**: `GET`
- **Rota**: `/user/me`
- **Autenticação**: ✅ Requerida
- **Response**: Dados completos do usuário

#### 1.4 Buscar Awards do Usuário
- **Método**: `GET`
- **Rota**: `/user/me/awards`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "data": [/* array de awards */]
    }
  }
  ```

#### 1.5 Buscar Métricas do Usuário
- **Método**: `GET`
- **Rota**: `/user/me/metrics`
- **Autenticação**: ✅ Requerida
- **Response**: Métricas gerais do dashboard

#### 1.6 Buscar Gráfico de Analytics
- **Método**: `GET`
- **Rota**: `/user/me/analytics/chart`
- **Autenticação**: ✅ Requerida
- **Query Params**: `period` (7_DAYS | 30_DAYS | 3_MONTHS)
- **Response**: Dados para gráfico de vendas/visitantes

#### 1.7 Solicitar Código para Mudança de Senha
- **Método**: `POST`
- **Rota**: `/user/password/request-code`
- **Autenticação**: ✅ Requerida
- **Response**: Mensagem de sucesso

#### 1.8 Alterar Senha
- **Método**: `POST`
- **Rota**: `/user/password/change`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "currentPassword": "string",
    "newPassword": "string",
    "code": "string (6 dígitos)"
  }
  ```

#### 1.9 Solicitar Código de Verificação por Email
- **Método**: `POST`
- **Rota**: `/user/email/send-code`
- **Autenticação**: ✅ Requerida

#### 1.10 Verificar Status do 2FA
- **Método**: `GET`
- **Rota**: `/user/2fa/status`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "enabled": boolean,
      "method": "email" | "app"
    }
  }
  ```

#### 1.11 Ativar 2FA
- **Método**: `POST`
- **Rota**: `/user/2fa/enable`
- **Autenticação**: ✅ Requerida

#### 1.12 Desativar 2FA
- **Método**: `POST`
- **Rota**: `/user/2fa/disable`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "password": "string (opcional)",
    "code": "string (opcional)"
  }
  ```

#### 1.13 Salvar Documento do Usuário
- **Método**: `POST`
- **Rota**: `/user/me/document-save`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `file`: File
  - `type`: string

#### 1.14 Listar Documentos do Usuário
- **Método**: `GET`
- **Rota**: `/user/me/documents`
- **Autenticação**: ✅ Requerida

---

### 🛍️ 2. PRODUTOS (`src/api/product.ts`)

#### 2.1 Criar Produto
- **Método**: `POST`
- **Rota**: `/products`
- **Autenticação**: ✅ Requerida
- **Body**: Dados do produto (CreateProductData)

#### 2.2 Listar Produtos
- **Método**: `GET`
- **Rota**: `/products`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `search`: string (opcional)
  - `status`: string (opcional)
  - `type`: string (opcional)
  - `paymentFormat`: string (opcional)
- **Response**: Lista paginada de produtos

#### 2.3 Buscar Produto por ID
- **Método**: `GET`
- **Rota**: `/products/:productId`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "product": { /* dados do produto */ }
    }
  }
  ```

#### 2.4 Atualizar Produto
- **Método**: `PUT`
- **Rota**: `/products/:productId`
- **Autenticação**: ✅ Requerida
- **Body**: Dados atualizados (UpdateProductData)

#### 2.5 Deletar Produto
- **Método**: `DELETE`
- **Rota**: `/products/:productId`
- **Autenticação**: ✅ Requerida

#### 2.6 Upload de Imagem do Produto
- **Método**: `POST`
- **Rota**: `/products/:productId/image`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `image`: File

#### 2.7 Remover Imagem do Produto
- **Método**: `DELETE`
- **Rota**: `/products/:productId/image`
- **Autenticação**: ✅ Requerida

---

### 📊 3. VENDAS (`src/api/sale.ts`)

#### 3.1 Consultar Vendas
- **Método**: `GET`
- **Rota**: `/sales/query`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `page`: number (opcional)
  - `pageSize`: number (opcional)
  - `status`: string (opcional)
  - `type`: string (opcional)
  - `search`: string (opcional)
  - `dateRange`: string (opcional)
  - `itemId`: string (opcional)
  - `method`: string (opcional)
  - `utmSource`: string (opcional)
  - `utmMedium`: string (opcional)
  - `utmCampaign`: string (opcional)
  - `utmTerm`: string (opcional)
  - `utmContent`: string (opcional)
- **Response**: Lista paginada de vendas com filtros aplicados

---

### 🎨 4. CHECKOUT E TEMAS (`src/api/checkout.ts`)

#### 4.1 Buscar Dados Completos do Checkout
- **Método**: `GET`
- **Rota**: `/theme/settings/:productId`
- **Autenticação**: ✅ Requerida
- **Response**: Dados do produto + tema completo

#### 4.2 Atualizar Tema do Checkout
- **Método**: `PUT`
- **Rota**: `/theme/:productId/theme`
- **Autenticação**: ✅ Requerida
- **Body**: Dados do tema (CheckoutThemeType)

#### 4.3 Upload de Asset do Tema
- **Método**: `POST`
- **Rota**: `/theme/:productId/assets/:assetType`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Asset Types** (snake_case no backend):
  - `logo`
  - `favicon`
  - `banner_desktop`
  - `banner_mobile`
- **Body (FormData)**:
  - `file`: File
- **Response**: URL do asset enviado

#### 4.4 Remover Asset do Tema
- **Método**: `DELETE`
- **Rota**: `/theme/:productId/assets/:assetType`
- **Autenticação**: ✅ Requerida

---

### 🔗 5. INTEGRAÇÕES (`src/api/integration.ts`)

#### 5.1 Listar Integrações
- **Método**: `GET`
- **Rota**: `/integrations`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `search`: string (opcional)
  - `type`: string (opcional)
  - `active`: boolean (opcional)
  - `page`: number (opcional)
  - `limit`: number (opcional)

#### 5.2 Buscar Integração por ID
- **Método**: `GET`
- **Rota**: `/integrations/:id`
- **Autenticação**: ✅ Requerida

#### 5.3 Atualizar Integração
- **Método**: `PUT`
- **Rota**: `/integrations/:id`
- **Autenticação**: ✅ Requerida

#### 5.4 Deletar Integração
- **Método**: `DELETE`
- **Rota**: `/integrations/:id`
- **Autenticação**: ✅ Requerida

#### 5.5 Verificar Integração
- **Método**: `POST`
- **Rota**: `/integrations/:id/verify`
- **Autenticação**: ✅ Requerida

#### 5.6 Listar Integrações por Produto
- **Método**: `GET`
- **Rota**: `/integrations/products/:productId`
- **Autenticação**: ✅ Requerida

#### 5.7 Listar Integrações Não Associadas ao Produto
- **Método**: `GET`
- **Rota**: `/integrations/unassociated/:productId`
- **Autenticação**: ✅ Requerida

#### 5.8 Listar Produtos de uma Integração
- **Método**: `GET`
- **Rota**: `/integrations/:integrationId/products`
- **Autenticação**: ✅ Requerida

#### 5.9 Associar Integração a Produto
- **Método**: `POST`
- **Rota**: `/integrations/associate`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "integrationId": "string",
    "productId": "string"
  }
  ```

#### 5.10 Remover Associação de Integração com Produto
- **Método**: `DELETE`
- **Rota**: `/integrations/:integrationId/product/:productId`
- **Autenticação**: ✅ Requerida

#### 5.11 Associar Produtos em Massa
- **Método**: `POST`
- **Rota**: `/integrations/:integrationId/associate-products`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productIds": ["string"]
  }
  ```

#### 5.12 Adicionar Produto Individual à Integração
- **Método**: `POST`
- **Rota**: `/integrations/:integrationId/add-product`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productId": "string"
  }
  ```

#### 5.13 Remover Produto Individual da Integração
- **Método**: `DELETE`
- **Rota**: `/integrations/:integrationId/remove-product`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productId": "string"
  }
  ```

#### 5.14 Criar Integração UTMify
- **Método**: `POST`
- **Rota**: `/integrations/utmify`
- **Autenticação**: ✅ Requerida
- **Body**: CreateUtmifyIntegrationData

#### 5.15 Atualizar Integração UTMify
- **Método**: `PUT`
- **Rota**: `/integrations/utmify/:id`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateUtmifyIntegrationData

#### 5.16 Criar Integração Webhook
- **Método**: `POST`
- **Rota**: `/integrations/webhook`
- **Autenticação**: ✅ Requerida
- **Body**: CreateWebhookIntegrationData

#### 5.17 Atualizar Integração Webhook
- **Método**: `PUT`
- **Rota**: `/integrations/webhook/:id`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateWebhookIntegrationData

#### 5.18 Testar Integração UTMify
- **Método**: `POST`
- **Rota**: `/integrations/utmify/test`
- **Autenticação**: ✅ Requerida
- **Body**: TestUtmifyData

#### 5.19 Testar Integração Webhook
- **Método**: `POST`
- **Rota**: `/integrations/webhook/test`
- **Autenticação**: ✅ Requerida
- **Body**: TestWebhookData

---

### 🌐 6. DOMÍNIOS (`src/api/domain.ts`)

#### 6.1 Listar Domínios
- **Método**: `GET`
- **Rota**: `/domains`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `search`: string (opcional)
  - `status`: string (opcional)
  - `productId`: string (opcional)
  - `page`: number (opcional)
  - `limit`: number (opcional)

#### 6.2 Buscar Domínio por ID
- **Método**: `GET`
- **Rota**: `/domains/:id`
- **Autenticação**: ✅ Requerida

#### 6.3 Criar Domínio
- **Método**: `POST`
- **Rota**: `/domains`
- **Autenticação**: ✅ Requerida
- **Body**: DomainFormData

#### 6.4 Atualizar Domínio
- **Método**: `PUT`
- **Rota**: `/domains/:id`
- **Autenticação**: ✅ Requerida
- **Body**: Partial<DomainFormData>

#### 6.5 Deletar Domínio
- **Método**: `DELETE`
- **Rota**: `/domains/:id`
- **Autenticação**: ✅ Requerida

#### 6.6 Verificar Domínio
- **Método**: `POST`
- **Rota**: `/domains/:id/verify`
- **Autenticação**: ✅ Requerida

#### 6.7 Listar Domínios por Produto
- **Método**: `GET`
- **Rota**: `/domains/product/:productId`
- **Autenticação**: ✅ Requerida

#### 6.8 Associar Produtos em Massa ao Domínio
- **Método**: `POST`
- **Rota**: `/domains/:domainId/associate-products`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productIds": ["string"]
  }
  ```

#### 6.9 Adicionar Produto Individual ao Domínio
- **Método**: `POST`
- **Rota**: `/domains/:domainId/add-product`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productId": "string"
  }
  ```

#### 6.10 Remover Produto Individual do Domínio
- **Método**: `DELETE`
- **Rota**: `/domains/:domainId/remove-product`
- **Autenticação**: ✅ Requerida
- **Body**:
  ```json
  {
    "productId": "string"
  }
  ```

---

### 💰 7. SAQUES E FINANCEIRO (`src/api/withdrawal.ts`)

#### 7.1 Buscar Saldo
- **Método**: `GET`
- **Rota**: `/user/withdrawal/balance`
- **Autenticação**: ✅ Requerida

#### 7.2 Listar Saques
- **Método**: `GET`
- **Rota**: `/user/withdrawal`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `page`: number (padrão: 1)
  - `limit`: number (padrão: 10)

#### 7.3 Criar Saque
- **Método**: `POST`
- **Rota**: `/user/withdrawal`
- **Autenticação**: ✅ Requerida
- **Body**: CreateWithdrawalData

#### 7.4 Enviar Código de Verificação
- **Método**: `POST`
- **Rota**: `/user/withdrawal/send-code`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `type`: CodeType (opcional)

#### 7.5 Listar Chaves PIX
- **Método**: `GET`
- **Rota**: `/user/withdrawal/pix-key`
- **Autenticação**: ✅ Requerida

#### 7.6 Criar Chave PIX
- **Método**: `POST`
- **Rota**: `/user/withdrawal/pix-key`
- **Autenticação**: ✅ Requerida
- **Body**: CreatePixKeyData

#### 7.7 Deletar Chave PIX
- **Método**: `DELETE`
- **Rota**: `/user/withdrawal/pix-key/:pixKeyId`
- **Autenticação**: ✅ Requerida
- **Body**: DeletePixKeyData

---

### 🏆 8. AWARDS (`src/api/award.ts`)

#### 8.1 Listar Awards
- **Método**: `GET`
- **Rota**: `/awards`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `limit`: number (opcional)
  - `page`: number (opcional)

---

### 🔑 9. API KEYS (`src/api/api-key.ts`)

#### 9.1 Listar API Keys
- **Método**: `GET`
- **Rota**: `/api-keys`
- **Autenticação**: ✅ Requerida

#### 9.2 Criar API Key
- **Método**: `POST`
- **Rota**: `/api-keys`
- **Autenticação**: ✅ Requerida
- **Body**: CreateApiKeyData

#### 9.3 Atualizar API Key
- **Método**: `PUT`
- **Rota**: `/api-keys/:id`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateApiKeyData

#### 9.4 Deletar API Key
- **Método**: `DELETE`
- **Rota**: `/api-keys/:id`
- **Autenticação**: ✅ Requerida

#### 9.5 Buscar API Key por ID
- **Método**: `GET`
- **Rota**: `/api-keys/:id`
- **Autenticação**: ✅ Requerida

---

### 🎁 10. OFERTAS (`src/api/offer.ts`)

#### 10.1 Criar Oferta
- **Método**: `POST`
- **Rota**: `/offers`
- **Autenticação**: ✅ Requerida
- **Body**: CreateOfferData
- **Response**: 
  ```json
  {
    "data": {
      "offer": { /* dados da oferta */ }
    }
  }
  ```

#### 10.2 Criar Oferta Padrão
- **Método**: `POST`
- **Rota**: `/offers/default/:productId`
- **Autenticação**: ✅ Requerida

#### 10.3 Listar Ofertas por Produto
- **Método**: `GET`
- **Rota**: `/offers/product/:productId`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `page`: number (padrão: 1)
  - `limit`: number (padrão: 10)

#### 10.4 Buscar Oferta por ID
- **Método**: `GET`
- **Rota**: `/offers/:offerId`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "offer": { /* dados da oferta */ }
    }
  }
  ```

#### 10.5 Atualizar Oferta
- **Método**: `PUT`
- **Rota**: `/offers/:offerId`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateOfferData

#### 10.6 Definir Oferta como Padrão
- **Método**: `PATCH`
- **Rota**: `/offers/:offerId/default`
- **Autenticação**: ✅ Requerida

#### 10.7 Deletar Oferta
- **Método**: `DELETE`
- **Rota**: `/offers/:offerId`
- **Autenticação**: ✅ Requerida

---

### 📦 11. ORDERBUMPS (`src/api/orderbump.ts`)

#### 11.1 Buscar Orderbumps Disponíveis para Produto
- **Método**: `GET`
- **Rota**: `/products/:productId/order-bumps`
- **Autenticação**: ✅ Requerida

#### 11.2 Criar Orderbump
- **Método**: `POST`
- **Rota**: `/orderbumps`
- **Autenticação**: ✅ Requerida
- **Body**: CreateOrderbumpData

#### 11.3 Listar Orderbumps por Produto
- **Método**: `GET`
- **Rota**: `/orderbumps/product/:productId`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "orderBumps": [/* array de orderbumps */]
    }
  }
  ```

#### 11.4 Atualizar Orderbump
- **Método**: `PUT`
- **Rota**: `/orderbumps/:orderbumpId`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateOrderbumpData

#### 11.5 Deletar Orderbump
- **Método**: `DELETE`
- **Rota**: `/orderbumps/:orderbumpId`
- **Autenticação**: ✅ Requerida

#### 11.6 Upload de Imagem do Orderbump
- **Método**: `POST`
- **Rota**: `/orderbumps/:orderbumpId/image`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `image`: File

#### 11.7 Remover Imagem do Orderbump
- **Método**: `DELETE`
- **Rota**: `/orderbumps/:orderbumpId/image`
- **Autenticação**: ✅ Requerida

---

### 🎯 12. PIXELS (`src/api/pixel.ts`)

#### 12.1 Listar Pixels por Produto
- **Método**: `GET`
- **Rota**: `/pixels/:productId`
- **Autenticação**: ✅ Requerida

#### 12.2 Criar Pixel Facebook
- **Método**: `POST`
- **Rota**: `/pixels/:productId/facebook`
- **Autenticação**: ✅ Requerida
- **Body**: CreateFacebookPixelData

#### 12.3 Criar Pixel Google
- **Método**: `POST`
- **Rota**: `/pixels/:productId/google`
- **Autenticação**: ✅ Requerida
- **Body**: CreateGooglePixelData

#### 12.4 Criar Pixel TikTok
- **Método**: `POST`
- **Rota**: `/pixels/:productId/tiktok`
- **Autenticação**: ✅ Requerida
- **Body**: CreateTikTokPixelData

#### 12.5 Atualizar Pixel Facebook
- **Método**: `PUT`
- **Rota**: `/pixels/:productId/facebook/:pixelId`
- **Autenticação**: ✅ Requerida
- **Body**: UpdatePixelData

#### 12.6 Atualizar Pixel Google
- **Método**: `PUT`
- **Rota**: `/pixels/:productId/google/:pixelId`
- **Autenticação**: ✅ Requerida
- **Body**: UpdatePixelData

#### 12.7 Atualizar Pixel TikTok
- **Método**: `PUT`
- **Rota**: `/pixels/:productId/tiktok/:pixelId`
- **Autenticação**: ✅ Requerida
- **Body**: UpdatePixelData

#### 12.8 Deletar Pixel
- **Método**: `DELETE`
- **Rota**: `/pixels/:productId/:pixelId`
- **Autenticação**: ✅ Requerida

---

### 🚚 13. FRETES (`src/api/shipping.ts`)

#### 13.1 Listar Opções de Frete
- **Método**: `GET`
- **Rota**: `/shipping`
- **Autenticação**: ✅ Requerida
- **Query Params**:
  - `search`: string (opcional)
  - `productId`: string (opcional)
  - `page`: number (opcional)
  - `limit`: number (opcional)
- **Response**: 
  ```json
  {
    "data": {
      "pagination": { "total", "page", "limit" },
      "shippingOptions": [/* array de opções */]
    }
  }
  ```

#### 13.2 Criar Opção de Frete
- **Método**: `POST`
- **Rota**: `/shipping`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `name`: string
  - `description`: string (opcional)
  - `price`: number (string)
  - `productId`: string (opcional)
  - `image`: File (opcional)
- **Response**: 
  ```json
  {
    "data": {
      "shippingOption": { /* dados do frete */ }
    }
  }
  ```

#### 13.3 Atualizar Opção de Frete
- **Método**: `PUT`
- **Rota**: `/shipping/:id`
- **Autenticação**: ✅ Requerida
- **Body**: UpdateShippingData

#### 13.4 Deletar Opção de Frete
- **Método**: `DELETE`
- **Rota**: `/shipping/:id`
- **Autenticação**: ✅ Requerida

#### 13.5 Upload de Imagem do Frete
- **Método**: `POST`
- **Rota**: `/shipping/:id/image`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `image`: File

#### 13.6 Remover Imagem do Frete
- **Método**: `DELETE`
- **Rota**: `/shipping/:id/image`
- **Autenticação**: ✅ Requerida

#### 13.7 Listar Fretes por Produto
- **Método**: `GET`
- **Rota**: `/shipping/product/:productId`
- **Autenticação**: ✅ Requerida
- **Response**: 
  ```json
  {
    "data": {
      "shippingOptions": [/* array de opções */]
    }
  }
  ```

#### 13.8 Listar Produtos Associados a um Frete
- **Método**: `GET`
- **Rota**: `/shipping/:shippingId/products`
- **Autenticação**: ✅ Requerida

#### 13.9 Associar Produto a um Frete
- **Método**: `POST`
- **Rota**: `/shipping/:shippingId/product/:productId`
- **Autenticação**: ✅ Requerida

#### 13.10 Desassociar Produto de um Frete
- **Método**: `DELETE`
- **Rota**: `/shipping/:shippingId/product/:productId`
- **Autenticação**: ✅ Requerida

---

### 💬 14. PROVA SOCIAL (`src/api/social-proof.ts`)

#### 14.1 Criar Prova Social
- **Método**: `POST`
- **Rota**: `/theme/:productId/social-proofs`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `file`: File (opcional)
  - `text`: string
  - `name`: string (opcional)
  - `rating`: number (opcional, string)

#### 14.2 Atualizar Prova Social
- **Método**: `PUT`
- **Rota**: `/theme/:productId/social-proofs/:proofId`
- **Autenticação**: ✅ Requerida
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**: Mesmos campos do create (todos opcionais)

#### 14.3 Deletar Prova Social
- **Método**: `DELETE`
- **Rota**: `/theme/:productId/social-proofs/:proofId`
- **Autenticação**: ✅ Requerida

#### 14.4 Listar Provas Sociais (Pode não existir no backend)
- **Método**: `GET`
- **Rota**: `/theme/:productId/social-proofs`
- **Autenticação**: ✅ Requerida
- **Nota**: Front-end retorna array vazio se a rota não existir

---

### 🎨 15. TEMAS (`src/api/theme.ts`)

#### 15.1 Listar Temas do Usuário
- **Método**: `GET`
- **Rota**: `/theme/user-themes`
- **Autenticação**: ✅ Requerida

---

### 📈 16. LIVE VIEW (`src/api/live-view.ts`)

#### 16.1 Buscar Visitas
- **Método**: `GET`
- **Rota**: `/live-view/visits`
- **Autenticação**: ✅ Requerida
- **Query Params**: LiveViewVisitParams (opcional)

#### 16.2 Buscar Resumo de Analytics
- **Método**: `GET`
- **Rota**: `/live-view/analytics/summary`
- **Autenticação**: ✅ Requerida

#### 16.3 Buscar Séries de Analytics
- **Método**: `GET`
- **Rota**: `/live-view/analytics/series`
- **Autenticação**: ✅ Requerida
- **Query Params**: LiveViewSeriesParams (opcional)

#### 16.4 Buscar Picos de Analytics
- **Método**: `GET`
- **Rota**: `/live-view/analytics/peaks`
- **Autenticação**: ✅ Requerida

---

## 📝 PADRÕES DE RESPOSTA

### Estrutura Padrão de Sucesso
```json
{
  "data": {
    "message": "string (opcional)",
    // dados específicos da resposta
  }
}
```

### Estrutura Padrão de Erro
```json
{
  "error": "string",
  "message": "string"
}
```

---

## 🔐 AUTENTICAÇÃO

### Gerenciamento de Tokens
- **Armazenamento**: 
  - Cookie: `session_token` (7 dias)
  - localStorage: `session_token` e `user`
- **Interceptor**: Todas as requisições autenticadas adicionam automaticamente:
  ```
  Authorization: Bearer {token}
  ```
- **Logout Automático**: Em caso de erro 401 (exceto na rota `/auth/session`), o sistema:
  1. Limpa cookie e localStorage
  2. Redireciona para `/login`

---

## 📦 TIPOS DE CONTENT-TYPE

### JSON (Padrão)
- Headers: `Content-Type: application/json`
- Usado na maioria das requisições

### Multipart/Form-Data
- Headers: `Content-Type: multipart/form-data`
- Usado em:
  - Upload de imagens (produtos, orderbumps, fretes, assets de tema)
  - Upload de documentos
  - Criação de provas sociais
  - Upload de imagens de fretes

---

## 🌐 BASE URL

A URL base da API é definida através da variável de ambiente:
```
VITE_URL
```

Exemplo de configuração (`.env`):
```
VITE_URL=https://api.exemplo.com
```

---

## 📊 ESTATÍSTICAS

- **Total de Endpoints**: ~90+
- **Módulos de API**: 16
- **Métodos HTTP Utilizados**: GET, POST, PUT, PATCH, DELETE
- **Rotas com Autenticação**: ~95%
- **Rotas com Upload de Arquivo**: ~15

---

## 🔍 OBSERVAÇÕES IMPORTANTES

1. **Interceptor de Autenticação**: Todos os serviços (exceto `user.ts` para login/registro) têm interceptor próprio que adiciona o token, além do interceptor global do axios.

2. **Formatação de Dados**: 
   - CPF/CNPJ são enviados sem formatação (apenas números)
   - Telefones são enviados sem formatação

3. **Paginação**: A maioria das listagens suporta paginação via query params `page` e `limit`.

4. **Filtros**: Muitas listagens suportam múltiplos filtros via query params.

5. **Upload de Imagens**: Sempre usa `FormData` com o campo `file` ou `image`.

6. **Tratamento de Erros**: Todos os serviços capturam `AxiosError` e extraem mensagens de erro do response.

---

## 🚀 PRÓXIMOS PASSOS PARA IMPLEMENTAÇÃO DO BACK-END

1. Implementar todas as rotas listadas acima
2. Validar autenticação em todas as rotas protegidas
3. Implementar validação de dados de entrada (usar Zod ou similar)
4. Configurar CORS para aceitar credentials
5. Implementar rate limiting (especialmente em login e criação de código)
6. Configurar armazenamento de arquivos (imagens, documentos)
7. Implementar lógica de negócio específica de cada módulo
8. Configurar envio de emails (códigos de verificação, etc.)
9. Implementar sistema de 2FA
10. Configurar integração com provedores de pagamento (PIX)

---

**Documento gerado automaticamente a partir da análise do código front-end**
**Data**: $(date)
**Projeto**: OlympusPay Front-End


