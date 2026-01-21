# 🚀 DEPLOY DO FRONTEND NA VERCEL

## 📋 Passo a Passo Completo

---

## 📋 Passo 1: Criar Repositório GitHub para Frontend

1. Acesse: **https://github.com/new**
2. Crie um novo repositório:
   - **Repository name:** `Olympus-Frontend` (ou outro nome)
   - **Description:** `Frontend do gateway de pagamentos PIX`
   - **Visibility:** Escolha **Public** ou **Private**
   - ⚠️ **NÃO marque** "Add a README file"
3. Clique em **"Create repository"**

---

## 📋 Passo 2: Conectar Frontend ao GitHub

Após criar o repositório, execute:

```bash
cd C:\Users\umdoi\Downloads\Testando\insane-front-main

# SUBSTITUA "SEU-USUARIO" pelo seu usuário do GitHub
git remote add origin https://github.com/SEU-USUARIO/Olympus-Frontend.git

git branch -M main

git push -u origin main
```

---

## 📋 Passo 3: Deploy do Frontend na Vercel

### 3.1 Importar Projeto

1. Acesse: **https://vercel.com/new**
2. Importe o repositório **Olympus-Frontend**
3. Clique em **"Import"**

### 3.2 Configurar Projeto

Na tela de configuração:

- **Framework Preset:** Selecione **"Vite"** (ou deixe detectar automaticamente)
- **Root Directory:** Deixe **vazio**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.3 Configurar Variável de Ambiente

⚠️ **MUITO IMPORTANTE:** Configure ANTES de fazer deploy!

Clique em **"Environment Variables"** e adicione:

```
Nome: VITE_URL
Valor: https://olympus-payment.vercel.app
```

⚠️ **IMPORTANTE:** Esta é a URL do **BACKEND** (que já está no ar)!

Se o backend tiver outra URL, use a URL real do backend.

### 3.4 Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar
3. A Vercel gerará uma URL: `https://olympus-frontend-xxxxx.vercel.app`

---

## 📋 Passo 4: Atualizar BACKEND_URL no Backend

Após o frontend ser deployado:

1. **Copie a URL do frontend** gerada pela Vercel
2. No backend (Vercel), vá em **Settings** → **Environment Variables**
3. Atualize `FRONTEND_URL` com a URL real do frontend:
   ```
   FRONTEND_URL = https://olympus-frontend-xxxxx.vercel.app
   ```
4. Faça um novo deploy do backend

---

## ✅ Testar Gateway Completo

Após ambos os deploys:

### 1. Acessar Frontend:
```
https://olympus-frontend-xxxxx.vercel.app
```

### 2. Testar Funcionalidades:
- ✅ Login/Registro
- ✅ Criar produtos
- ✅ Criar ofertas
- ✅ Criar pedidos PIX
- ✅ Pagamentos

---

## 📊 Estrutura Completa

```
Backend (Vercel):
  URL: https://olympus-payment.vercel.app
  Variáveis:
    - MONGODB_URI
    - MERCADOPAGO_ACCESS_TOKEN
    - MP_WEBHOOK_SECRET
    - JWT_SECRET
    - FRONTEND_URL = https://olympus-frontend-xxxxx.vercel.app
    - BACKEND_URL = https://olympus-payment.vercel.app

Frontend (Vercel):
  URL: https://olympus-frontend-xxxxx.vercel.app
  Variáveis:
    - VITE_URL = https://olympus-payment.vercel.app
```

---

## 🔄 Atualização Automática

Após conectar ambos os repositórios à Vercel:

- ✅ Cada push no GitHub gera **deploy automático**
- ✅ Backend e Frontend se atualizam automaticamente
- ✅ Não precisa fazer deploy manual toda vez

---

## ⚠️ IMPORTANTE: Ordem de Deploy

1. **Primeiro:** Deploy do Backend (já feito ✅)
2. **Segundo:** Deploy do Frontend (agora)
3. **Terceiro:** Atualizar `FRONTEND_URL` no Backend
4. **Quarto:** Redeploy do Backend (automático)

---

**🎉 Após isso, seu gateway completo estará no ar!**



