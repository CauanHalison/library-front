# 📚 Library Front - Interface do Sistema de Gerenciamento de Biblioteca

![Vue.js](https://img.shields.io/badge/Vue.js-3-green?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-blueviolet?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-yellow?logo=pinia&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel&logoColor=white)

Este é o frontend do sistema de gerenciamento de bibliotecas, desenvolvido com o ecossistema moderno do **Vue.js 3** e construído com **Vite**. Ele consome de forma segura e responsiva a [Library API](file:///c:/Users/Cauan%20Halison/Documents/Projetos/libraryApi) desenvolvida em Spring Boot.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vite.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) (Com nova integração nativa para Vite)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Tipagem estática)
- **Gerenciamento de Estado**: [Pinia](https://pinia.vuejs.org/) (com o plugin `pinia-plugin-persistedstate` para persistência de sessão)
- **Roteamento**: [Vue Router 5](https://router.vuejs.org/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)
- **Decodificação de JWT**: `jwt-decode`

---

## 🚀 Recursos Principais

1. **Autenticação Segura (OAuth2)**:
   - Fluxo de login e autorização integrado com o servidor Spring Security.
   - Fluxo de autorização de código (Authorization Code Flow) ou integração via cliente OAuth2.
   - Gerenciamento de sessão persistida do usuário e perfis de acesso (`roles`).

2. **Gerenciamento de Autores**:
   - Cadastro, listagem paginada e edição de autores.
   - Validações em tempo real nos formulários.

3. **Gerenciamento de Livros**:
   - Cadastro de livros atrelados aos seus respectivos autores.
   - Filtros de pesquisa dinâmica combinada (ISBN, título, gênero, ano de publicação).

4. **Experiência do Usuário (UX)**:
   - Interface totalmente responsiva estilizada com Tailwind CSS.
   - Modais interativos e sistema de alertas globais para notificações de sucesso, erro e alertas de edição.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure de acordo com o seu ambiente de desenvolvimento ou produção:

```env
# URL da API REST (Backend)
VITE_API_URL=http://localhost:8080

# Configurações do Cliente OAuth2 registrado no Backend
VITE_AUTH_CLIENT_ID=seu-client-id-registrado
VITE_AUTH_REDIRECT_URI=http://localhost:5173/login-callback
```

---

## 🏃 Como Rodar o Projeto Localmente

### 1. Pré-requisitos
* Node.js instalado (versão 22.18 ou superior).
* Gerenciador de pacotes `npm` ou `yarn`.

### 2. Instalação das Dependências
No terminal, dentro do diretório do projeto, execute:
```bash
npm install
```

### 3. Executando em Modo de Desenvolvimento
Para iniciar o servidor local com hot-reload ativo:
```bash
npm run dev
```
O projeto estará acessível por padrão no link: [http://localhost:5173](http://localhost:5173)

### 4. Build de Produção
Para compilar e minificar o projeto para ambiente de produção (gerando os arquivos estáticos na pasta `dist`):
```bash
npm run build
```

---

## 📁 Integração com o Backend
O frontend se comunica diretamente com o repositório da [Library API](file:///c:/Users/Cauan%20Halison/Documents/Projetos/libraryApi), enviando tokens JWT nos cabeçalhos (`Authorization: Bearer <token>`) de cada requisição protegida para autenticar ações baseadas nas permissões do usuário logado.