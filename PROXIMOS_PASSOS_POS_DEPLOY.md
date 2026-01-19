# 📋 PRÓXIMOS PASSOS APÓS DEPLOY DO FRONTEND

## ✅ Status Atual

- ✅ Frontend configurado corretamente na Vercel
- ✅ Variável `VITE_URL` configurada
- ⏳ Aguardando deploy...

---

## 🚀 Passo 1: Fazer Deploy

1. Na tela de configuração da Vercel, clique em **"Deploy"** (botão no canto inferior direito)
2. Aguarde o build completar (2-3 minutos)
3. **Copie a URL gerada** após o deploy: `https://olympus-frontend-xxxxx.vercel.app`

---

## ⚙️ Passo 2: Atualizar Backend com URL do Frontend

Após o frontend ser deployado com sucesso:

### 2.1 Acessar Configurações do Backend

1. Na Vercel, vá para o projeto **backend** (`olympus-payment`)
2. Clique em **Settings** → **Environment Variables**

### 2.2 Atualizar FRONTEND_URL

1. Encontre a variável `FRONTEND_URL` (ou crie se não existir)
2. Atualize o valor com a URL do frontend gerada:
   ```
   FRONTEND_URL = https://olympus-frontend-xxxxx.vercel.app
   ```
3. Clique em **Save**

### 2.3 Redeploy Automático

- A Vercel fará um redeploy automático após salvar a variável
- Aguarde alguns minutos

---

## ✅ Passo 3: Configurar Todas as Variáveis do Backend

⚠️ **IMPORTANTE:** Configure TODAS as variáveis de ambiente do backend:

### Backend (Settings → Environment Variables):

```
MONGODB_URI = mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority

MERCADOPAGO_ACCESS_TOKEN = TEST-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx

MP_WEBHOOK_SECRET = seu-webhook-secret-aqui

JWT_SECRET = sua-chave-secreta-jwt-muito-segura-aqui

FRONTEND_URL = https://olympus-frontend-xxxxx.vercel.app (URL do frontend após deploy)

BACKEND_URL = https://olympus-payment.vercel.app

DOMAIN_CNAME_VALUE = checkout.olympuspay.com.br (opcional)
```

---

## 🧪 Passo 4: Testar Gateway Completo

Após ambos os deploys e variáveis configuradas:

### 4.1 Testar Frontend:
```
https://olympus-frontend-xxxxx.vercel.app
```

### 4.2 Testar Funcionalidades:
- ✅ Acessar a landing page
- ✅ Criar conta (registro)
- ✅ Fazer login
- ✅ Criar produtos
- ✅ Criar ofertas
- ✅ Criar pedidos PIX
- ✅ Testar pagamentos

### 4.3 Testar Backend:
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

---

## 🔗 URLs Finais do Gateway

### Backend:
```
https://olympus-payment.vercel.app
```

### Frontend:
```
https://olympus-frontend-xxxxx.vercel.app
```

---

## ✅ Checklist Final

### Backend:
- [ ] Todas as variáveis de ambiente configuradas
- [ ] `FRONTEND_URL` atualizada com URL do frontend
- [ ] Health check funcionando
- [ ] Webhook do Mercado Pago configurado (opcional)

### Frontend:
- [ ] Deploy realizado
- [ ] `VITE_URL` configurada
- [ ] Frontend acessível
- [ ] Comunicação com backend funcionando

### Gateway Completo:
- [ ] Frontend acessível
- [ ] Login/Registro funcionando
- [ ] Produtos funcionando
- [ ] Pagamentos PIX funcionando

---

## 🎉 Pronto!

Após todos esses passos, seu gateway completo estará funcionando em produção!

---

## ⚠️ Lembrete Importante

Se houver algum erro após o deploy:
1. Verifique os logs na Vercel (Runtime Logs / Build Logs)
2. Verifique se todas as variáveis de ambiente estão configuradas
3. Verifique se as URLs estão corretas (sem barras no final)


