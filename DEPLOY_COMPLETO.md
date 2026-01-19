# 🚀 DEPLOY COMPLETO DO GATEWAY - FRONTEND + BACKEND

## 🎯 Objetivo

Fazer deploy do gateway completo (frontend + backend) na Vercel para testes em produção.

---

## ✅ STATUS ATUAL

### Backend:
- ✅ Deploy realizado com sucesso
- ✅ URL: `https://olympus-payment.vercel.app`
- ✅ Status: Ready
- ⚠️ **Pendente:** Configurar variáveis de ambiente

### Frontend:
- ⏳ Preparando para deploy

---

## 📋 PASSO A PASSO COMPLETO

### **PARTE 1: BACKEND (Já feito ✅)**

1. ✅ Repositório GitHub criado: `paymentolympus-art/Olympus`
2. ✅ Deploy realizado na Vercel
3. ⚠️ **FAZER AGORA:** Configurar variáveis de ambiente no backend

---

### **PARTE 2: FRONTEND (Agora)**

#### **2.1 Criar Repositório GitHub para Frontend**

1. Acesse: **https://github.com/new**
2. Crie um novo repositório:
   - **Repository name:** `Olympus-Frontend` (ou outro nome)
   - **Description:** `Frontend do gateway de pagamentos PIX`
   - **Visibility:** Public ou Private
   - ⚠️ **NÃO marque** "Add a README file"
3. Clique em **"Create repository"**

#### **2.2 Conectar Frontend ao GitHub**

Execute no terminal:

```bash
cd C:\Users\umdoi\Downloads\Testando\insane-front-main

# SUBSTITUA pela URL do seu repositório frontend
git remote add origin https://github.com/paymentolympus-art/Olympus-Frontend.git

git branch -M main

git push -u origin main
```

#### **2.3 Deploy do Frontend na Vercel**

1. Acesse: **https://vercel.com/new**
2. Importe o repositório **Olympus-Frontend**
3. Configure:
   - **Framework Preset:** Vite (deve detectar automaticamente)
   - **Root Directory:** (vazio)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. **Configurar variável de ambiente:**
   - Nome: `VITE_URL`
   - Valor: `https://olympus-payment.vercel.app` (URL do backend)
5. Clique em **"Deploy"**
6. Aguarde build completar
7. Copie a URL gerada: `https://olympus-frontend-xxxxx.vercel.app`

---

### **PARTE 3: CONFIGURAR VARIÁVEIS DE AMBIENTE**

#### **3.1 Backend (URGENTE!)**

Na Vercel, vá em **Settings** → **Environment Variables** do projeto backend:

```
MONGODB_URI = mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority

MERCADOPAGO_ACCESS_TOKEN = TEST-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx

MP_WEBHOOK_SECRET = seu-webhook-secret-aqui

JWT_SECRET = sua-chave-secreta-jwt-muito-segura-aqui

FRONTEND_URL = https://olympus-frontend-xxxxx.vercel.app (URL do frontend após deploy)

BACKEND_URL = https://olympus-payment.vercel.app

DOMAIN_CNAME_VALUE = checkout.olympuspay.com.br
```

#### **3.2 Frontend**

Na Vercel, vá em **Settings** → **Environment Variables** do projeto frontend:

```
VITE_URL = https://olympus-payment.vercel.app
```

---

### **PARTE 4: ATUALIZAR CORS E URLS**

#### **4.1 Atualizar FRONTEND_URL no Backend**

Após o frontend ser deployado:

1. Copie a URL do frontend gerada pela Vercel
2. No backend (Vercel), atualize `FRONTEND_URL` com a URL real
3. Faça um novo deploy do backend (automático após salvar)

#### **4.2 Atualizar VITE_URL no Frontend (se necessário)**

Se o backend mudar de URL:

1. No frontend (Vercel), atualize `VITE_URL` com a nova URL do backend
2. Faça um novo deploy do frontend (automático após salvar)

---

## ✅ CHECKLIST FINAL

### Backend:
- [x] Deploy realizado
- [ ] Variáveis de ambiente configuradas
- [ ] FRONTEND_URL atualizada após deploy do frontend
- [ ] Health check funcionando
- [ ] Webhook do Mercado Pago configurado

### Frontend:
- [ ] Repositório GitHub criado
- [ ] Push realizado
- [ ] Deploy na Vercel realizado
- [ ] VITE_URL configurada
- [ ] Frontend funcionando e se comunicando com backend

### Gateway Completo:
- [ ] Frontend acessível
- [ ] Login/Registro funcionando
- [ ] Produtos funcionando
- [ ] Pagamentos PIX funcionando

---

## 🔗 URLs do Gateway

Após tudo configurado:

### Backend:
```
https://olympus-payment.vercel.app
```

### Frontend:
```
https://olympus-frontend-xxxxx.vercel.app
```

---

## 🎯 Próximos Passos

1. **Configurar variáveis de ambiente do backend** (URGENTE!)
2. **Criar repositório GitHub para frontend**
3. **Fazer push do frontend**
4. **Deploy do frontend na Vercel**
5. **Atualizar FRONTEND_URL no backend**
6. **Testar gateway completo!**

---

**🎉 Após isso, seu gateway completo estará funcionando em produção!**


