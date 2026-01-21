# 🔧 CORRIGIR CONEXÃO FRONTEND ↔ BACKEND

## ❌ Problema: Frontend não conecta ao backend

### 🎯 URLs do Gateway:
- **Frontend:** `https://olympus-frontend-swart.vercel.app`
- **Backend:** `https://olympus-payment.vercel.app`

---

## ✅ Soluções Necessárias:

### **1. Configurar FRONTEND_URL no Backend (URGENTE!)**

O backend precisa saber qual é a URL do frontend para permitir CORS.

#### Na Vercel (Backend):

1. Vá para o projeto **backend** (`olympus-payment`)
2. Clique em **Settings** → **Environment Variables**
3. Adicione ou atualize:

```
Nome: FRONTEND_URL
Valor: https://olympus-frontend-swart.vercel.app
```

⚠️ **IMPORTANTE:** Use a URL **real** do seu frontend! Se for diferente, ajuste.

4. Clique em **Save**
5. Aguarde o redeploy automático (2-3 minutos)

---

### **2. Configurar Todas as Variáveis do Backend**

Se ainda não configurou, adicione **TODAS** estas variáveis:

#### Na Vercel (Backend) → Settings → Environment Variables:

```
MONGODB_URI = mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority

MERCADOPAGO_ACCESS_TOKEN = TEST-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx

MP_WEBHOOK_SECRET = seu-webhook-secret-aqui

JWT_SECRET = sua-chave-secreta-jwt-muito-segura-aqui

FRONTEND_URL = https://olympus-frontend-swart.vercel.app

BACKEND_URL = https://olympus-payment.vercel.app
```

⚠️ **IMPORTANTE:** Substitua pelos valores reais!

---

### **3. Verificar VITE_URL no Frontend**

O frontend precisa saber a URL do backend.

#### Na Vercel (Frontend):

1. Vá para o projeto **frontend** (`olympus-frontend-swart`)
2. Clique em **Settings** → **Environment Variables**
3. Verifique se está configurado:

```
Nome: VITE_URL
Valor: https://olympus-payment.vercel.app
```

✅ Se já estiver configurado, está correto!

---

### **4. Testar Conexão**

Após configurar tudo:

#### 4.1 Testar Backend:
Acesse no navegador:
```
https://olympus-payment.vercel.app/health
```

Deve retornar:
```json
{
  "status": "ok",
  "message": "Servidor funcionando corretamente"
}
```

#### 4.2 Testar Frontend:
Acesse:
```
https://olympus-frontend-swart.vercel.app
```

Tente fazer login novamente.

---

## 🔍 Verificar Erros no Console

Se ainda não funcionar:

1. Abra o navegador
2. Pressione **F12** (DevTools)
3. Vá na aba **Console**
4. Tente fazer login novamente
5. Veja qual erro aparece

Erros comuns:
- `CORS policy`: Backend não tem `FRONTEND_URL` configurada
- `404 Not Found`: Backend não está respondendo
- `401 Unauthorized`: Credenciais incorretas ou backend sem JWT_SECRET
- `500 Internal Server Error`: Backend sem `MONGODB_URI` ou outras variáveis

---

## ✅ Checklist de Verificação

### Backend (Vercel):
- [ ] `MONGODB_URI` configurada
- [ ] `MERCADOPAGO_ACCESS_TOKEN` configurada
- [ ] `MP_WEBHOOK_SECRET` configurada
- [ ] `JWT_SECRET` configurada
- [ ] `FRONTEND_URL` = `https://olympus-frontend-swart.vercel.app`
- [ ] `BACKEND_URL` = `https://olympus-payment.vercel.app`
- [ ] Health check funcionando (`/health`)

### Frontend (Vercel):
- [ ] `VITE_URL` = `https://olympus-payment.vercel.app`
- [ ] Frontend acessível
- [ ] Console sem erros de CORS

---

## 🎯 Resumo do Problema

O erro "Erro ao realizar login" acontece porque:

1. **Backend não tem `FRONTEND_URL` configurada** → CORS bloqueia requisições
2. **Backend pode estar sem variáveis essenciais** → MongoDB, JWT, etc não funcionam

**Solução:** Configure todas as variáveis de ambiente do backend!

---

## 📞 Se Ainda Não Funcionar

Envie:
1. Erro do console do navegador (F12 → Console)
2. URL do backend testada (`/health`)
3. Confirmação de que todas as variáveis estão configuradas



