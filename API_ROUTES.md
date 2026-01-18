# Rotas da API - Configurações de Segurança

Este documento detalha todas as rotas que precisam ser implementadas no backend para suportar as funcionalidades de configuração (2FA e mudança de senha).

## Autenticação

Todas as rotas abaixo (exceto as públicas) requerem autenticação via token de sessão no header:

```
Authorization: Bearer {token}
```

---

## 1. Solicitar Código de Verificação para Mudança de Senha

**Método:** `POST`  
**Rota:** `/user/password/request-code`  
**Autenticação:** ✅ Requerida

### Descrição

Envia um código de verificação de 6 dígitos por email para o usuário autenticado, permitindo que ele altere sua senha.

### Request Body

Nenhum (usa o usuário autenticado da sessão)

### Response Success (200)

```json
{
  "data": {
    "message": "Código de verificação enviado com sucesso",
    "expiresIn": 600 // tempo em segundos (opcional)
  }
}
```

### Response Error (400/401/500)

```json
{
  "error": "Mensagem de erro",
  "message": "Mensagem de erro alternativa"
}
```

### Validações Necessárias

- Verificar se o usuário está autenticado
- Verificar se o email do usuário está verificado
- Gerar código de 6 dígitos
- Armazenar código com expiração (ex: 10 minutos)
- Enviar email com o código
- Rate limiting (ex: máximo 3 tentativas por hora)

---

## 2. Alterar Senha

**Método:** `POST`  
**Rota:** `/user/password/change`  
**Autenticação:** ✅ Requerida

### Descrição

Altera a senha do usuário autenticado, requerendo senha atual, nova senha e código de verificação.

### Request Body

```json
{
  "currentPassword": "senha_atual_123",
  "newPassword": "nova_senha_456",
  "code": "123456"
}
```

### Validações do Body

- `currentPassword`: string, obrigatório, mínimo 6 caracteres
- `newPassword`: string, obrigatório, mínimo 6 caracteres
- `code`: string, obrigatório, exatamente 6 dígitos

### Response Success (200)

```json
{
  "data": {
    "message": "Senha alterada com sucesso"
  }
}
```

### Response Error (400/401/403/500)

```json
{
  "error": "Mensagem de erro",
  "message": "Mensagem de erro alternativa"
}
```

### Validações Necessárias

- Verificar se o usuário está autenticado
- Verificar se a senha atual está correta
- Verificar se o código de verificação é válido e não expirou
- Verificar se a nova senha é diferente da atual
- Validar força da nova senha (opcional: mínimo 6 caracteres)
- Invalidar código após uso
- Invalidar todas as sessões ativas (opcional, para segurança)

### Possíveis Erros

- `400`: Código inválido ou expirado
- `400`: Senha atual incorreta
- `400`: Nova senha igual à atual
- `400`: Nova senha não atende aos critérios
- `401`: Não autenticado
- `500`: Erro interno

---

## 3. Verificar Status do 2FA

**Método:** `GET`  
**Rota:** `/user/2fa/status`  
**Autenticação:** ✅ Requerida

### Descrição

Retorna o status atual da autenticação de dois fatores do usuário.

### Request Body

Nenhum

### Response Success (200)

```json
{
  "data": {
    "enabled": true,
    "method": "email" // ou "app" se usar authenticator app
  }
}
```

### Response Error (401/500)

```json
{
  "error": "Mensagem de erro",
  "message": "Mensagem de erro alternativa"
}
```

### Validações Necessárias

- Verificar se o usuário está autenticado
- Buscar status do 2FA do usuário no banco de dados

---

## 4. Ativar Autenticação de Dois Fatores

**Método:** `POST`  
**Rota:** `/user/2fa/enable`  
**Autenticação:** ✅ Requerida

### Descrição

Ativa a autenticação de dois fatores para o usuário autenticado.

### Request Body

Nenhum (usa o usuário autenticado da sessão)

### Response Success (200)

```json
{
  "data": {
    "message": "Autenticação de dois fatores ativada com sucesso",
    "enabled": true
  }
}
```

### Response Error (400/401/500)

```json
{
  "error": "Mensagem de erro",
  "message": "Mensagem de erro alternativa"
}
```

### Validações Necessárias

- Verificar se o usuário está autenticado
- Verificar se o email do usuário está verificado (se usar 2FA por email)
- Atualizar status do 2FA no banco de dados
- Configurar método de 2FA (email, SMS, app authenticator, etc.)

### Possíveis Erros

- `400`: Email não verificado
- `400`: 2FA já está ativado
- `401`: Não autenticado
- `500`: Erro interno

---

## 5. Desativar Autenticação de Dois Fatores

**Método:** `POST`  
**Rota:** `/user/2fa/disable`  
**Autenticação:** ✅ Requerida

### Descrição

Desativa a autenticação de dois fatores para o usuário autenticado.

### Request Body

Nenhum (usa o usuário autenticado da sessão)

**⚠️ IMPORTANTE:** Por segurança, considere exigir confirmação adicional (senha atual ou código de verificação) antes de desativar o 2FA.

### Opção 1: Sem confirmação adicional (menos seguro)

```json
{}
```

### Opção 2: Com confirmação (recomendado)

```json
{
  "password": "senha_atual_123"
}
```

ou

```json
{
  "code": "123456"
}
```

### Response Success (200)

```json
{
  "data": {
    "message": "Autenticação de dois fatores desativada com sucesso",
    "enabled": false
  }
}
```

### Response Error (400/401/403/500)

```json
{
  "error": "Mensagem de erro",
  "message": "Mensagem de erro alternativa"
}
```

### Validações Necessárias

- Verificar se o usuário está autenticado
- Se implementar confirmação: validar senha ou código
- Verificar se o 2FA está ativado antes de desativar
- Atualizar status do 2FA no banco de dados

### Possíveis Erros

- `400`: 2FA já está desativado
- `400`: Senha ou código de confirmação incorreto
- `401`: Não autenticado
- `403`: Confirmação necessária
- `500`: Erro interno

---

## Estrutura de Dados Sugerida no Banco

### Tabela: `users`

```sql
- id
- email
- password_hash
- two_factor_enabled (boolean, default: false)
- two_factor_method (string: 'email' | 'sms' | 'app', nullable)
- email_verified (boolean)
- created_at
- updated_at
```

### Tabela: `password_reset_codes` (ou similar)

```sql
- id
- user_id (foreign key)
- code (string, 6 dígitos)
- expires_at (timestamp)
- used (boolean, default: false)
- created_at
```

### Tabela: `two_factor_codes` (se usar códigos temporários)

```sql
- id
- user_id (foreign key)
- code (string, 6 dígitos)
- expires_at (timestamp)
- used (boolean, default: false)
- created_at
```

---

## Fluxo de Implementação Sugerido

### 1. Mudança de Senha

1. Usuário clica em "Solicitar Código"
2. Backend gera código de 6 dígitos
3. Backend armazena código com expiração (10 min)
4. Backend envia email com código
5. Usuário preenche formulário com senha atual, nova senha e código
6. Backend valida senha atual
7. Backend valida código (não expirado, não usado)
8. Backend atualiza senha
9. Backend marca código como usado
10. Backend invalida sessões antigas (opcional)

### 2. Ativar 2FA

1. Usuário ativa switch de 2FA
2. Backend verifica se email está verificado
3. Backend atualiza `two_factor_enabled = true`
4. Backend configura método (ex: 'email')
5. Em futuros logins, backend exigirá código 2FA

### 3. Desativar 2FA

1. Usuário desativa switch de 2FA
2. Backend valida confirmação (senha ou código) - se implementado
3. Backend atualiza `two_factor_enabled = false`
4. Backend remove método de 2FA

---

## Notas de Segurança

1. **Rate Limiting**: Implemente rate limiting para:
   - Solicitação de códigos (máx 3 por hora)
   - Tentativas de alteração de senha (máx 5 por hora)
   - Tentativas de ativar/desativar 2FA

2. **Expiração de Códigos**: Códigos devem expirar em 10-15 minutos

3. **Uso Único**: Códigos devem ser marcados como usados após uso

4. **Logs de Segurança**: Registre todas as ações de segurança:
   - Solicitação de códigos
   - Alteração de senha
   - Ativação/desativação de 2FA

5. **Notificações**: Envie emails de notificação para:
   - Código de verificação solicitado
   - Senha alterada com sucesso
   - 2FA ativado
   - 2FA desativado

6. **Validação de Email**: Para 2FA por email, exija email verificado

---

## Exemplo de Implementação (Pseudocódigo)

```javascript
// POST /user/password/request-code
async function requestPasswordChangeCode(req, res) {
  const userId = req.user.id; // do token JWT
  const code = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await db.passwordCodes.create({
    userId,
    code,
    expiresAt,
    used: false,
  });

  await sendEmail(req.user.email, {
    subject: "Código de Verificação",
    body: `Seu código é: ${code}`,
  });

  return res.json({ data: { message: "Código enviado" } });
}

// POST /user/password/change
async function changePassword(req, res) {
  const { currentPassword, newPassword, code } = req.body;
  const userId = req.user.id;

  // Validar senha atual
  const user = await db.users.findById(userId);
  if (!bcrypt.compare(currentPassword, user.password_hash)) {
    return res.status(400).json({ error: "Senha atual incorreta" });
  }

  // Validar código
  const codeRecord = await db.passwordCodes.findOne({
    userId,
    code,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!codeRecord) {
    return res.status(400).json({ error: "Código inválido ou expirado" });
  }

  // Atualizar senha
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  await db.users.update(userId, { password_hash: newPasswordHash });

  // Marcar código como usado
  await db.passwordCodes.update(codeRecord.id, { used: true });

  return res.json({ data: { message: "Senha alterada com sucesso" } });
}
```
