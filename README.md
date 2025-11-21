# ConsultHub 🎯

<div align="center">
  <img src="./src/assets/consulting.png" alt="ConsultHub Logo" width="200"/>

  ### Sistema de Gestão de Consultores

  Uma plataforma moderna e completa para gerenciamento de consultores, desenvolvida com Angular e Firebase.

  [![Angular](https://img.shields.io/badge/Angular-20.3.0-red.svg)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-20.0.1-orange.svg)](https://firebase.google.com/)
</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Deploy](#-deploy)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 🚀 Sobre o Projeto

O **ConsultHub** é uma aplicação web full-stack para gestão de consultores, permitindo cadastro, listagem, edição e exclusão de profissionais. O sistema conta com autenticação de usuários e interface moderna e responsiva.

### Principais Características:
- ✅ Sistema de autenticação seguro (login/registro)
- ✅ CRUD completo de consultores
- ✅ Interface responsiva e moderna
- ✅ Validação de formulários em tempo real
- ✅ Proteção de rotas com guards
- ✅ Integração completa com Firebase
- ✅ Deploy otimizado na Vercel

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em boas práticas do Angular, dividida em camadas bem definidas:

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Angular)                │
├─────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐            │
│  │  Features  │  │   Shared   │            │
│  │  Modules   │  │ Components │            │
│  └────────────┘  └────────────┘            │
│         │               │                   │
│         └───────┬───────┘                   │
│                 │                           │
│         ┌───────▼──────┐                    │
│         │  Core Layer  │                    │
│         │ (Services,   │                    │
│         │  Guards,     │                    │
│         │  Models)     │                    │
│         └───────┬──────┘                    │
└─────────────────┼───────────────────────────┘
                  │
          ┌───────▼──────────┐
          │   Firebase API   │
          └──────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
┌─────▼─────┐         ┌───────▼────┐
│ Firestore │         │    Auth    │
│ Database  │         │  Service   │
└───────────┘         └────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

#### Core Framework
- **Angular 20.3.0** - Framework principal para construção da interface
  - `@angular/core` - Núcleo do framework
  - `@angular/common` - Funcionalidades comuns
  - `@angular/forms` - Gerenciamento de formulários
  - `@angular/router` - Sistema de roteamento

#### Linguagem e Ferramentas
- **TypeScript 5.9.2** - Superset do JavaScript com tipagem estática
- **RxJS 7.8.0** - Biblioteca para programação reativa
- **Zone.js 0.15.0** - Contexto de execução para detecção de mudanças

#### Build e Desenvolvimento
- **Angular CLI 20.3.7** - Interface de linha de comando
- **@angular/build 20.3.7** - Sistema de build otimizado
- **@angular/compiler-cli** - Compilador Angular

#### Testes
- **Jasmine 5.9.0** - Framework de testes
- **Karma 6.4.0** - Test runner
- **karma-jasmine** - Adaptador Jasmine para Karma
- **karma-chrome-launcher** - Launcher para Chrome
- **karma-coverage** - Cobertura de código

#### Code Quality
- **Prettier** - Formatação de código
  - Configuração customizada para Angular templates
  - Print width: 100 caracteres
  - Single quotes habilitado

### Backend (Firebase)

#### Firebase Services
- **@angular/fire 20.0.1** - Biblioteca oficial Angular para Firebase
- **Firebase Authentication** - Autenticação de usuários
  - Login com email/senha
  - Registro de novos usuários
  - Gerenciamento de sessões
- **Cloud Firestore** - Banco de dados NoSQL
  - Coleção de consultores
  - Timestamps automáticos
  - Queries em tempo real

#### Configuração Firebase
- **Project ID**: consulthub-cb5b0
- **Auth Domain**: consulthub-cb5b0.firebaseapp.com
- **Storage Bucket**: consulthub-cb5b0.firebasestorage.app

---

## 📁 Estrutura do Projeto

```
consulthub/
│
├── .vscode/                      # Configurações do VS Code
├── public/                       # Arquivos públicos estáticos
│
├── src/                          # Código fonte da aplicação
│   ├── app/                      # Módulo principal da aplicação
│   │   │
│   │   ├── core/                 # Módulo Core (Singleton Services)
│   │   │   ├── guards/           # Guards de roteamento
│   │   │   │   ├── auth-guard.ts              # Guard de autenticação
│   │   │   │   └── auth-guard.spec.ts         # Testes do guard
│   │   │   │
│   │   │   ├── models/           # Modelos de dados/interfaces
│   │   │   │   └── consultor.model.ts         # Interface Consultor
│   │   │   │
│   │   │   ├── services/         # Serviços principais
│   │   │   │   ├── auth.service.ts            # Serviço de autenticação
│   │   │   │   └── consultor.service.ts       # Serviço de consultores (CRUD)
│   │   │   │
│   │   │   └── core-module.ts    # Módulo core
│   │   │
│   │   ├── features/             # Módulos de funcionalidades
│   │   │   │
│   │   │   ├── auth/             # Módulo de Autenticação
│   │   │   │   ├── login/                     # Componente de login
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.css
│   │   │   │   │
│   │   │   │   ├── register/                  # Componente de registro
│   │   │   │   │   ├── register.component.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   └── register.component.css
│   │   │   │   │
│   │   │   │   ├── auth-module.ts             # Módulo de autenticação
│   │   │   │   └── auth-routing-module.ts     # Rotas de autenticação
│   │   │   │
│   │   │   └── consultores/      # Módulo de Consultores
│   │   │       │
│   │   │       ├── lista/                     # Lista de consultores
│   │   │       │   ├── lista.ts
│   │   │       │   ├── lista.component.html
│   │   │       │   └── lista.component.css
│   │   │       │
│   │   │       ├── form/                      # Formulário (criar/editar)
│   │   │       │   ├── form.component.ts
│   │   │       │   ├── form.component.html
│   │   │       │   └── form.component.css
│   │   │       │
│   │   │       ├── detalhe/                   # Detalhes do consultor
│   │   │       │   ├── detalhe.component.ts
│   │   │       │   ├── detalhe.component.html
│   │   │       │   └── detalhe.component.css
│   │   │       │
│   │   │       ├── consultores-module.ts      # Módulo de consultores
│   │   │       └── consultores-routing-module.ts  # Rotas de consultores
│   │   │
│   │   ├── shared/               # Componentes compartilhados
│   │   │   ├── navbar/           # Componente de navegação
│   │   │   │   ├── navbar.component.ts
│   │   │   │   ├── navbar.component.html
│   │   │   │   └── navbar.component.css
│   │   │   │
│   │   │   ├── footer/           # Componente de rodapé
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.css
│   │   │   │
│   │   │   ├── loading/          # Componente de loading
│   │   │   │   ├── loading.component.ts
│   │   │   │   ├── loading.component.html
│   │   │   │   └── loading.component.css
│   │   │   │
│   │   │   └── shared-module.ts  # Módulo compartilhado
│   │   │
│   │   ├── app.component.ts      # Componente raiz
│   │   ├── app.config.ts         # Configuração da aplicação
│   │   ├── app.module.ts         # Módulo principal
│   │   ├── app.routes.ts         # Rotas principais (standalone)
│   │   ├── app-routing.module.ts # Módulo de rotas (module-based)
│   │   └── app.css               # Estilos globais do componente
│   │
│   ├── assets/                   # Recursos estáticos
│   │   └── consulting.png        # Logo/imagem de consultoria
│   │
│   ├── environments/             # Configurações de ambiente
│   │   └── environment.ts        # Variáveis de ambiente (dev/prod)
│   │
│   ├── index.html                # HTML principal
│   ├── main.ts                   # Ponto de entrada da aplicação
│   └── styles.css                # Estilos globais
│
├── .editorconfig                 # Configurações do editor
├── .gitignore                    # Arquivos ignorados pelo Git
│
├── angular.json                  # Configuração do Angular CLI
├── package.json                  # Dependências e scripts
├── package-lock.json             # Lock de dependências
│
├── tsconfig.json                 # Configuração base do TypeScript
├── tsconfig.app.json             # Config TypeScript para aplicação
├── tsconfig.spec.json            # Config TypeScript para testes
│
└── README.md                     # Documentação do projeto
```

### Descrição dos Principais Diretórios

#### 📦 `/src/app/core`
Contém os serviços singleton, guards e modelos de dados essenciais para toda a aplicação.

**Arquivos principais:**
- `services/auth.service.ts` - Gerenciamento de autenticação (login, logout, registro)
- `services/consultor.service.ts` - Operações CRUD no Firestore
- `guards/auth-guard.ts` - Proteção de rotas autenticadas
- `models/consultor.model.ts` - Interfaces TypeScript para tipagem

#### 🎨 `/src/app/features`
Módulos de funcionalidades organizados por domínio.

**Módulos:**
- `auth/` - Sistema de autenticação (login e registro)
- `consultores/` - Gestão completa de consultores (lista, form, detalhes)

#### 🔧 `/src/app/shared`
Componentes reutilizáveis em toda a aplicação.

**Componentes:**
- `navbar/` - Barra de navegação responsiva
- `footer/` - Rodapé da aplicação
- `loading/` - Indicador de carregamento

#### ⚙️ `/src/environments`
Configurações específicas por ambiente (desenvolvimento/produção).

**Contém:**
- Credenciais do Firebase
- URLs de API
- Feature flags

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.x ou superior)
- **npm** (versão 9.x ou superior)
- **Angular CLI** (versão 20.x)

```bash
# Verificar versões instaladas
node --version
npm --version
ng version
```

Para instalar o Angular CLI globalmente:
```bash
npm install -g @angular/cli@20
```

---

## 📥 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/consulthub.git
cd consulthub
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente Firebase**

Edite o arquivo `src/environments/environment.ts` com suas credenciais do Firebase (se necessário):

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
  }
};
```

---

## 🚀 Executando o Projeto

### Servidor de Desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse: `http://localhost:4200/`

A aplicação recarregará automaticamente quando você modificar qualquer arquivo fonte.

### Build de Produção

```bash
npm run build
# ou
ng build --configuration production
```

Os arquivos de build serão gerados no diretório `dist/`.

### Executar Testes

```bash
npm test
# ou
ng test
```

### Build em Modo Watch

```bash
npm run watch
# ou
ng build --watch --configuration development
```

---

## 🎯 Funcionalidades

### Sistema de Autenticação
- ✅ **Login** - Autenticação com email e senha
- ✅ **Registro** - Cadastro de novos usuários
- ✅ **Logout** - Encerramento de sessão
- ✅ **Proteção de Rotas** - Guards para rotas autenticadas

### Gestão de Consultores
- ✅ **Listar** - Visualização de todos os consultores cadastrados
- ✅ **Criar** - Cadastro de novos consultores
- ✅ **Visualizar** - Detalhes completos de um consultor
- ✅ **Editar** - Atualização de informações
- ✅ **Excluir** - Remoção de consultores
- ✅ **Filtros** - Busca e filtros por especialização

### Interface
- ✅ **Responsiva** - Adaptável a diferentes tamanhos de tela
- ✅ **Loading States** - Feedback visual durante operações
- ✅ **Validação de Formulários** - Validação em tempo real
- ✅ **Mensagens de Erro** - Feedback claro para o usuário

---

## 🌐 Deploy

### Vercel

O projeto está configurado para deploy automático na Vercel:

```bash
npm run build:prod
# ou
npm run vercel-build
```

O script `vercel-build` está configurado no `package.json` e executa automaticamente o build de produção.

**Configurações de Deploy:**
- Build Command: `npm run vercel-build`
- Output Directory: `dist/consulthub/browser`
- Node Version: 18.x

### Firebase Hosting (Alternativa)

Para deploy no Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `ng serve` | Inicia servidor de desenvolvimento |
| `build` | `ng build` | Build de desenvolvimento |
| `build:prod` | `ng build --configuration production` | Build de produção |
| `vercel-build` | `ng build --configuration production` | Build otimizado para Vercel |
| `watch` | `ng build --watch --configuration development` | Build em modo watch |
| `test` | `ng test` | Executa testes unitários |

---

## 📊 Modelo de Dados

### Interface Consultor

```typescript
interface Consultor {
  id?: string;                    // ID gerado pelo Firestore
  nomeCompleto: string;           // Nome completo do consultor
  email: string;                  // Email de contato
  telefone: string;               // Telefone de contato
  areaEspecializacao: string;     // Área de especialização
  ativo?: boolean;                // Status ativo/inativo
  dataCadastro?: Timestamp;       // Data de criação (automático)
  dataAtualizacao?: Timestamp;    // Data de atualização (automático)
}
```

### Estrutura no Firestore

```
consultores/
├── {docId}/
│   ├── nomeCompleto: string
│   ├── email: string
│   ├── telefone: string
│   ├── areaEspecializacao: string
│   ├── ativo: boolean
│   ├── dataCadastro: Timestamp
│   └── dataAtualizacao: Timestamp
```

---

## 🔐 Segurança

- **Autenticação Firebase** - Sistema robusto de autenticação
- **Guards de Rota** - Proteção de rotas privadas
- **Validação de Formulários** - Validação client-side e server-side
- **Environment Variables** - Credenciais em arquivos de ambiente
- **HTTPS** - Deploy com certificado SSL/TLS

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**ConsultHub Team**

---

## 📞 Suporte

Para suporte, envie um email para contato@consulthub.com ou abra uma issue no GitHub.

---

<div align="center">
  Desenvolvido com ❤️ usando Angular e Firebase
</div>
