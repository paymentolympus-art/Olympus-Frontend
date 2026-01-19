# ⚙️ Configuração do Frontend

## 📋 Arquivo .env Necessário

Crie um arquivo `.env` na raiz do frontend (`insane-front-main/.env`) com:

```env
VITE_URL=http://localhost:3000
PORT=5173
```

**⚠️ IMPORTANTE**: Sem este arquivo, o frontend não conseguirá conectar ao backend!

---

## 🚀 Como Rodar

### Opção 1: Script Automático (Recomendado)

Na raiz do projeto (`Testando/`), execute:
```bash
INICIAR_TUDO.bat
```

Este script iniciará backend e frontend automaticamente!

### Opção 2: Manual (2 Terminais)

**Terminal 1 - Backend:**
```bash
cd insane-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd insane-front-main
npm run dev
```

---

## 🌐 URLs

- **Frontend**: http://localhost:5173/
- **Backend**: http://localhost:3000

---

## ✅ Pronto!

Após configurar, o frontend estará conectado ao backend! 🎉


