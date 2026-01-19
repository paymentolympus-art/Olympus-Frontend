# 📋 COMANDOS GITHUB PARA FRONTEND

## Passo a Passo para Conectar Frontend ao GitHub

---

### **1. Criar Repositório no GitHub**

1. Acesse: **https://github.com/new**
2. Crie um novo repositório:
   - **Repository name:** `Olympus-Frontend` (ou outro nome de sua escolha)
   - **Description:** `Frontend do gateway de pagamentos PIX`
   - **Visibility:** Escolha **Public** ou **Private**
   - ⚠️ **NÃO marque** "Add a README file", "Add .gitignore", ou "Choose a license"
3. Clique em **"Create repository"**

---

### **2. Conectar Frontend ao GitHub**

Após criar o repositório, **COPIE A URL** do repositório (algo como: `https://github.com/paymentolympus-art/Olympus-Frontend.git`)

Execute no PowerShell:

```powershell
cd C:\Users\umdoi\Downloads\Testando\insane-front-main

# SUBSTITUA pela URL do SEU repositório
git remote add origin https://github.com/paymentolympus-art/Olympus-Frontend.git

git branch -M main

git push -u origin main
```

**⚠️ IMPORTANTE:** 
- Substitua `paymentolympus-art` pelo seu usuário do GitHub
- Substitua `Olympus-Frontend` pelo nome que você escolheu para o repositório

---

### **3. Verificar se Funcionou**

Após executar os comandos:

1. Acesse seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados
3. Você deve ver a pasta `src/`, `public/`, `package.json`, etc.

---

**✅ Pronto! Agora você pode fazer deploy do frontend na Vercel!**


