# 📚 Library Front

A modern and responsive web interface for the library management system. This frontend consumes a RESTful API to manage authors and books dynamically and securely.

## 🚀 Features
- **Secure Authentication:** Integrated login and registration flow with an OAuth2 server (using Authorization Code flow with PKCE).
- **Book Management:** Create, list, and view details of literary works.
- **Author Management:** Create and list authors associated with books.
- **Visual Feedback:** Custom alert system and interactive modals for user actions.

## 🛠️ Built With
This project was developed using the modern Vue 3 ecosystem:
- **[Vue 3](https://vuejs.org/):** Progressive JavaScript framework for building interfaces.
- **[Vite](https://vite.dev/):** Extremely fast build tool.
- **[TypeScript](https://www.typescriptlang.org/):** Static typing for safety and productivity.
- **[Pinia](https://pinia.vuejs.org/):** Global state management (used for alerts and auth state).
- **[Vue Router](https://router.vuejs.org/):** SPA (Single Page Application) routing.
- **[Axios](https://axios-http.com/):** HTTP client to communicate with the API.

## 🔧 Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (version 18+ recommended)
- `npm` or `yarn` package manager

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/library-front.git
cd library-front
```

### 2. Configure Enviroment Variables
create a `.env` file in the root directory and configure your local API and auth URLs:

```bash
VITE_API_URL= Your API URL
VITE_AUTH_CLIENT_ID= Your Client ID
VITE_AUTH_REDIRECT_URI= Tuor Client Redirect URI
```

### 3. Install Dependencies and Run
```bash
# Install dependencies
npm install

#Run the project in development mode
npm run dev
```
The project will run locally at `http://localhost:5173`