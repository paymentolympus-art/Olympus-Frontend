# 🛒 CONFIGURAÇÃO DO CHECKOUT PÚBLICO

## ✅ O QUE FOI IMPLEMENTADO

1. **Página pública de checkout** (`PublicCheckoutPage.tsx`)
   - Renderiza o checkout visual (temas SHOP/SIMPLE/SELECT)
   - Sem sidebar de edição
   - Sem autenticação necessária

2. **Hook `usePublicCheckout`**
   - Busca dados da API pública `/checkout/:slug`
   - Não requer autenticação

3. **Rota pública `/:slug`**
   - Captura qualquer slug na raiz
   - Exemplo: `pay.testandogat.shop/oferta01`

---

## ⚠️ PROBLEMA ATUAL

**O domínio está apontando para o BACKEND, mas precisa apontar para o FRONTEND!**

### Configuração Atual (ERRADA):
```
pay.testandogat.shop → CNAME → checkout.olympuspayment.com.br (BACKEND)
```

**Resultado:** Quando você acessa `pay.testandogat.shop/oferta01`, você vê apenas JSON porque o backend retorna dados, não HTML.

---

## ✅ SOLUÇÃO: APONTAR PARA O FRONTEND

### Configuração Correta:
```
pay.testandogat.shop → CNAME → [URL do seu frontend na Vercel]
```

**Exemplo:**
```
pay.testandogat.shop → CNAME → olympus-frontend-swart.vercel.app
```

---

## 🔧 COMO CONFIGURAR

### Passo 1: Identificar URL do Frontend na Vercel

1. Vá em: https://vercel.com/dashboard
2. Abra o projeto do **FRONTEND**
3. Vá em **Settings** → **Domains**
4. Copie a URL do domínio padrão (ex: `olympus-frontend-swart.vercel.app`)

### Passo 2: Configurar DNS

No seu provedor de DNS (onde você configurou o domínio `testandogat.shop`):

1. **Remova** o CNAME atual:
   ```
   pay → checkout.olympuspayment.com.br (REMOVER)
   ```

2. **Adicione** novo CNAME:
   ```
   Tipo: CNAME
   Nome: pay
   Valor: olympus-frontend-swart.vercel.app
   (ou a URL do seu frontend na Vercel)
   ```

### Passo 3: Adicionar Domínio na Vercel (Frontend)

1. Vercel → Projeto Frontend → Settings → Domains
2. Clique em **"Add Domain"**
3. Digite: `pay.testandogat.shop`
4. Clique em **"Add"**
5. Aguarde SSL ser provisionado (~2 minutos)

---

## 🎯 COMO FUNCIONA AGORA

### Fluxo Completo:

```
1. Cliente acessa: pay.testandogat.shop/oferta01
   ↓
2. DNS redireciona para: frontend.vercel.app
   ↓
3. Frontend (React Router) captura rota /:slug
   ↓
4. PublicCheckoutPage busca: backend/checkout/oferta01
   ↓
5. Renderiza checkout visual (SHOP/SIMPLE/SELECT) ✅
```

---

## 🧪 TESTAR

Após configurar:

1. Aguarde propagação DNS (~5-15 minutos)
2. Aguarde SSL na Vercel (~2 minutos)
3. Acesse: `https://pay.testandogat.shop/oferta01`
4. Deve aparecer o checkout visual completo! 🎉

---

## 🔍 VERIFICAR SE ESTÁ FUNCIONANDO

### Se aparecer JSON:
- ❌ Domínio ainda aponta para o backend
- ✅ Solução: Alterar CNAME para o frontend

### Se aparecer página em branco:
- ❌ Frontend não encontrou o slug
- ✅ Verifique se o slug da oferta está correto

### Se aparecer erro 404:
- ❌ Oferta não encontrada
- ✅ Verifique se o produto está ATIVO e tem oferta padrão

---

## 📝 ALTERNATIVA: Usar Subdomínio Fixo

Se não quiser configurar domínios customizados por cliente:

**Todos os checkouts usam:**
```
checkout.olympuspayment.com.br/oferta01
```

**Vantagens:**
- ✅ Não precisa configurar DNS por cliente
- ✅ Funciona imediatamente
- ✅ Mais simples

**Desvantagens:**
- ❌ URL não é personalizada por cliente

---

## 🆘 PROBLEMAS COMUNS

### "CORS error"
- O frontend está tentando buscar dados de outro domínio
- Verifique se `VITE_URL` está configurado corretamente
- Verifique se o backend permite CORS do domínio do frontend

### "Checkout não encontrado"
- Verifique se o slug da oferta está correto
- Verifique se o produto está ATIVO
- Verifique se existe oferta padrão

### "Página em branco"
- Abra o console do navegador (F12)
- Veja os erros no console
- Verifique se a API retornou dados corretos

---

## ✅ CHECKLIST FINAL

- [ ] Frontend deployado na Vercel
- [ ] Domínio `pay.testandogat.shop` aponta para FRONTEND
- [ ] Domínio adicionado no projeto frontend da Vercel
- [ ] SSL provisionado
- [ ] Produto está ATIVO
- [ ] Oferta padrão criada
- [ ] Teste: `https://pay.testandogat.shop/oferta01`



