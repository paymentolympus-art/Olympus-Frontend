# OlympusPay

O projeto é uma SPA (Single Page Application) React com TypeScript, construída com Vite e organizada seguindo princípios de componentização e separation of concerns.

Plataforma de pagamento (Gateway)

Arquiteto @didimo.dev

## Estrutura de Pastas

```js
src/
├── 📂 api/           # Serviços de API (shipping, user)
├── 📂 assets/        # Recursos estáticos
├── 📂 components/    # Componentes reutilizáveis
│   ├── 📂 animations/    # Animações customizadas
│   ├── 📂 features/      # Features específicas (access, dashboard, landing, shipping)
│   ├── 📂 ui/           # Componentes base (shadcn/ui)
│   └── 📂 widgets/      # Widgets complexos (modal, navigation)
├── 📂 constants/     # Constantes (rotas)
├── 📂 hooks/         # Custom hooks
├── 📂 layouts/       # Layouts da aplicação
├── 📂 lib/           # Utilitários e configurações
├── 📂 pages/         # Páginas da aplicação
├── 📂 validators/    # Validações (Zod)
└── 📂 Routers.tsx    # Configuração de rotas
```
