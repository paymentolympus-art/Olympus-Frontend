# 🚀 COMO INICIAR OS SERVIDORES

## ✅ PORTAS CONFIGURADAS

- **Backend**: Porta `3000` (http://localhost:3000)
- **Frontend**: Porta `8080` (http://localhost:8080)

---

## 🚀 OPÇÃO 1: INICIAR MANUALMENTE

### Terminal 1 - Backend

```bash
cd insane-backend
npm run dev
```

**Você deve ver:**
```
✅ MongoDB conectado com sucesso!
   Database: olympus-pay
🚀 Servidor iniciado com sucesso!
   URL: http://localhost:3000
```

### Terminal 2 - Frontend

```bash
cd insane-front-main
npm run dev
```

**Você deve ver:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://[::]:8080/
```

---

## 🚀 OPÇÃO 2: SCRIPT AUTOMÁTICO (Windows PowerShell)

Crie um arquivo `start-dev.ps1` na raiz do projeto:

```powershell
# Iniciar Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd insane-backend; npm run dev"

# Aguardar 3 segundos
Start-Sleep -Seconds 3

# Iniciar Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd insane-front-main; npm run dev"

Write-Host "✅ Servidores iniciados!"
Write-Host "   Backend: http://localhost:3000"
Write-Host "   Frontend: http://localhost:8080"
```

**Execute:**
```powershell
.\start-dev.ps1
```

---

## 🧪 TESTAR CONEXÃO

### 1. Backend (Health Check)

Acesse no navegador:
```
http://localhost:3000/health
```

**Response esperado:**
```json
{
  "status": "ok",
  "message": "Servidor funcionando corretamente",
  "timestamp": "..."
}
```

### 2. Frontend

Acesse no navegador:
```
http://localhost:8080
```

**Você deve ver a interface do frontend!**

---

## ⚙️ CONFIGURAÇÃO DO FRONTEND

O frontend está configurado para se conectar ao backend através da variável de ambiente `VITE_URL`.

**Verifique o arquivo `.env` do frontend:**

```env
VITE_URL=http://localhost:3000
```

---

## 🐛 TROUBLESHOOTING

### Erro: "ERR_CONNECTION_REFUSED" na porta 8080

**Solução:**
- Verifique se o frontend está rodando: `npm run dev` na pasta `insane-front-main`
- Verifique se a porta 8080 não está sendo usada por outro processo

### Erro: "Cannot connect to backend"

**Solução:**
- Verifique se o backend está rodando na porta 3000
- Verifique o arquivo `.env` do frontend: `VITE_URL=http://localhost:3000`

### Erro: "MongoDB connection failed"

**Solução:**
- Verifique se a string de conexão no `.env` do backend está correta
- Verifique se o MongoDB Atlas está acessível
- Verifique se o IP está na whitelist do Atlas

---

## ✅ CHECKLIST

- [ ] Backend rodando na porta 3000
- [ ] Frontend rodando na porta 8080
- [ ] MongoDB Atlas conectado
- [ ] `.env` do frontend com `VITE_URL=http://localhost:3000`
- [ ] `.env` do backend com `MONGODB_URI` configurado

---

**🎯 Agora você pode acessar:**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000


